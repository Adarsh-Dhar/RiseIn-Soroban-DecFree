// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract NFTVerification is ERC721 {
    // Mapping from freelancer address to NFT ID
    mapping(address => uint256) public freelancerNFTs;

    // Events
    event NFTMinted(address indexed freelancer, uint256 indexed tokenId);
    event NFTTransferred(address indexed from, address indexed to, uint256 indexed tokenId);

    // Constructor
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    // Function to mint a new NFT for a freelancer
    function mintNFT(address _freelancer, string memory _metadata) external {
        // Generate a new token ID
        

        // Mint the new NFT

        // Set metadata for the NFT

        // Store the NFT ID for the freelancer

        // Emit NFTMinted event
    }

    // Function to transfer an NFT to another address
    function transferNFT(address _to, uint256 _tokenId) external {
        // Transfer the NFT to the recipient
        _transfer(msg.sender, _to, _tokenId);

        // Emit NFTTransferred event
        emit NFTTransferred(msg.sender, _to, _tokenId);
    }

    // Function to verify the ownership of an NFT
    function verifyNFT(address _owner, uint256 _tokenId) external view returns (bool) {
        return ownerOf(_tokenId) == _owner;
    }
}
