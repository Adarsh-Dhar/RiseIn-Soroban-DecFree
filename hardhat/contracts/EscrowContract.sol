// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EscrowContract {
    // Struct to represent an escrow
    struct Escrow {
        address client;
        address freelancer;
        uint256 projectId;
        uint256 amount;
        bool released;
        bool approved;
        bool disputed;
    }

    // Mapping from project ID to escrow details
    mapping(uint256 => Escrow) public escrows;

    // Events
    event EscrowCreated(uint256 indexed projectId, address indexed client, address indexed freelancer, uint256 amount);
    event EscrowReleased(uint256 indexed projectId, address indexed freelancer, uint256 amount);
    event EscrowApproved(uint256 indexed projectId, address indexed client);
    event EscrowDisputed(uint256 indexed projectId);
    event EscrowRefunded(uint256 indexed projectId, address indexed client, uint256 amount);

    // Function to create a new escrow
    function createEscrow(uint256 _projectId, address _freelancer, uint256 _amount) external {
        // Create a new escrow
        Escrow memory newEscrow = Escrow({
            client: msg.sender,
            freelancer: _freelancer,
            projectId: _projectId,
            amount: _amount,
            released: false,
            approved: false,
            disputed: false
        });

        // Store the escrow details
        escrows[_projectId] = newEscrow;

        // Emit EscrowCreated event
        emit EscrowCreated(_projectId, newEscrow.client, newEscrow.freelancer, newEscrow.amount);
    }

    // Function to release escrowed funds to the freelancer
    function releaseEscrow(uint256 _projectId) external {
        // Implement release logic
        // (e.g., check project status, client approval, etc.)

        // Update escrow state
        escrows[_projectId].released = true;

        // Emit EscrowReleased event
        emit EscrowReleased(_projectId, escrows[_projectId].freelancer, escrows[_projectId].amount);
    }

    // Function to approve project completion and release escrowed funds
    function approveEscrow(uint256 _projectId) external {
        // Implement approval logic
        // (e.g., verify project completion, freelancer submission, etc.)

        // Update escrow state
        escrows[_projectId].approved = true;

        // Emit EscrowApproved event
        emit EscrowApproved(_projectId, escrows[_projectId].client);
    }

    // Function to initiate dispute resolution process
    function disputeEscrow(uint256 _projectId) external {
        // Implement dispute resolution logic
        // (e.g., verify project status, initiate dispute resolution process, etc.)

        // Update escrow state
        escrows[_projectId].disputed = true;

        // Emit EscrowDisputed event
        emit EscrowDisputed(_projectId);
    }

    // Function to refund escrowed funds to the client
    function refundEscrow(uint256 _projectId) external {
        // Implement refund logic
        // (e.g., verify project cancellation, initiate refund process, etc.)

        // Refund the escrowed funds to the client
        payable(escrows[_projectId].client).transfer(escrows[_projectId].amount);

        // Emit EscrowRefunded event
        emit EscrowRefunded(_projectId, escrows[_projectId].client, escrows[_projectId].amount);
    }
}
