import { expect } from 'chai';
import { ethers } from 'hardhat';
const { waffle } = require('ethereum-waffle');

describe('NFTVerificationContract', function () {
  let nftContract : any;
  let owner;
  let freelancer : any;
  let anotherFreelancer : any;

  beforeEach(async function () {
    [owner, freelancer, anotherFreelancer] = await ethers.getSigners();

    // Deploy NFTVerificationContract
    const NFTVerificationContractFactory = await ethers.getContractFactory('NFTVerificationContract');
    nftContract = await NFTVerificationContractFactory.deploy('NFTVerification', 'NFTV');
  });

  describe('mintNFT', function () {
    it('should mint a new NFT for a freelancer', async function () {
      const metadata = 'https://example.com/metadata';

      await nftContract.mintNFT(freelancer.address, metadata);

      const tokenId = await nftContract.freelancerNFT(freelancer.address);
    

      const tokenOwner = await nftContract.ownerOf(tokenId);
      expect(tokenOwner).to.equal(freelancer.address);

      const tokenURI = await nftContract.tokenURI(tokenId);
      expect(tokenURI).to.equal(metadata);
    });
  });

  describe('transferNFT', function () {
    it('should transfer an NFT to another address', async function () {
      const metadata = 'https://example.com/metadata';

      await nftContract.mintNFT(freelancer.address, metadata);

      const tokenId = await nftContract.freelancerNFT(freelancer.address);
      await nftContract.transferNFT(anotherFreelancer.address, tokenId);

      const newTokenOwner = await nftContract.ownerOf(tokenId);
      expect(newTokenOwner).to.equal(anotherFreelancer.address);
    });
  });

  describe('verifyNFT', function () {
    it('should verify the ownership of an NFT', async function () {
      const metadata = 'https://example.com/metadata';

      await nftContract.mintNFT(freelancer.address, metadata);

      const tokenId = await nftContract.freelancerNFT(freelancer.address);
      const isOwner = await nftContract.verifyNFT(freelancer.address, tokenId);
      expect(isOwner).to.be.true;
    });
  });
});