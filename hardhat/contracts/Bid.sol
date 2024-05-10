pragma solidity ^0.8.0;
import "./Project.sol";

contract BidContract {
    ProjectContract public projectContract;

   

    
    // Struct to represent a bid
    struct Bid {
        address bidder; // Address of the freelancer bidding
        uint256 amount; // Bid amount in wei
        uint256 timestamp;
        uint256 projectId;
        
    }

    error WrongTimestamp();
    error WrongProject();
    error BidFailed();
   

   

    // Mapping from project ID to array of bids
    mapping(uint256 => Bid[]) public projectBids;

    // Events
    event BidPlaced(uint256 indexed projectId, address indexed bidder, uint256 amount, uint256 timestamp);

    // Function to place a bid on a project
    function placeBid(uint256 _projectId) external payable {
        ProjectContract.Project memory project;
         uint256 projectBudget = project.budget;
        require(msg.value <= projectBudget, "Bid amount must be greater than 0");

        // Create a new bid object
        Bid memory newBid = Bid({
            bidder: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp,
            projectId : project.id 
        });

        // Add the bid to the project's array of bids
        projectBids[_projectId].push(newBid);

        // Emit BidPlaced event
        emit BidPlaced(_projectId, msg.sender, msg.value, block.timestamp);
    }

    function createBid(uint256 _projectId, address _bidder, uint256 _amount, uint256 _timestamp) external {
        // Create a new bid object
        Bid memory newBid = Bid({
            bidder: _bidder,
            amount: _amount,
            timestamp: _timestamp,
            projectId : _projectId
        });

        // Add the bid to the project's array of bids
        projectBids[_projectId].push(newBid);

        // Emit BidPlaced event
        emit BidPlaced(_projectId, _bidder, _amount, _timestamp);
    }

    function getBidStruct(uint256 _projectId) public view returns (Bid[] memory) {
        return projectBids[_projectId];
    }

    // Function to get the number of bids for a project
    function getNumBids(uint256 _projectId) external view returns (uint256) {
        return projectBids[_projectId].length;
    }

    // Function to get details of a bid for a project
    function getBid(uint256 _projectId, uint256 _index) external view returns (address bidder, uint256 amount, uint256 timestamp) {
        Bid storage bid = projectBids[_projectId][_index];
        return (bid.bidder, bid.amount, bid.timestamp);
    }

    

    function getAllBids(uint256 _projectId) external view returns (Bid[] memory) {
        uint256 numBids = projectBids[_projectId].length;
        Bid[] memory bidderInfos = new Bid[](numBids);

        for (uint256 i = 0; i < numBids; i++) {
            Bid storage bid = projectBids[_projectId][i];
            bidderInfos[i] = Bid({
                bidder: bid.bidder,
                amount: bid.amount,
                timestamp: bid.timestamp,
                projectId : _projectId
            });
        }

        return bidderInfos;
    }

}