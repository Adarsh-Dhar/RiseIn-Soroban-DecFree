// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BidVerification {
    struct Bid {
        uint256 id;
        uint256 price;
        bool isVerified;
        uint256 numberOfVerifiers;
        address worker;
        address freelancer;
    }

    mapping(uint256 => Bid) public bids;
    mapping(uint256 => mapping(address => bool)) public workerVotes;
    address[] public workers;
    uint256 public totalBids;

    function addWorker(address worker) public {
        workers.push(worker);
    }

    function createBid(uint256 price) public payable {
        require(msg.value == price, "Insufficient funds sent");
        totalBids++;
        bids[totalBids] = Bid(totalBids, price, false, 0, address(0), msg.sender);
    }

    function verifyBid(uint256 bidId, bool vote) public {
        require(isWorker(msg.sender), "Only workers can verify bids");
        Bid storage bid = bids[bidId];
        require(!workerVotes[bidId][msg.sender], "Worker has already voted");

        workerVotes[bidId][msg.sender] = vote;
        bid.numberOfVerifiers++;

        uint256 trueVotes = 0;
        uint256 falseVotes = 0;
        for (uint256 i = 0; i < workers.length; i++) {
            if (workerVotes[bidId][workers[i]]) {
                trueVotes++;
            } else {
                falseVotes++;
            }
        }

        if (trueVotes > falseVotes) {
            bid.isVerified = true;
        } else if (falseVotes > trueVotes) {
            bid.isVerified = false;
        }
    }

    function claimReward(uint256 bidId) public {
        Bid storage bid = bids[bidId];
        require(bid.isVerified == workerVotes[bidId][msg.sender], "Worker voted differently from the majority");

        uint256 reward = bid.price / bid.numberOfVerifiers;
        uint256 totalReward = reward * bid.numberOfVerifiers;

        if (bid.isVerified) {
            for (uint256 i = 0; i < workers.length; i++) {
                if (workerVotes[bidId][workers[i]]) {
                    payable(workers[i]).transfer(reward);
                }
            }
            payable(bid.freelancer).transfer(bid.price - totalReward);
        } else {
            payable(bid.freelancer).transfer(bid.price);
        }
    }

    function isWorker(address account) private view returns (bool) {
        for (uint256 i = 0; i < workers.length; i++) {
            if (workers[i] == account) {
                return true;
            }
        }
        return false;
    }
}