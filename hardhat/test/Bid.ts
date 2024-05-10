import { expect } from 'chai';
import { ethers } from 'hardhat';
const { waffle } = require('ethereum-waffle');

describe('BidContract', function () {
  let bidContract: any;
  let projectContract:any;
  let owner : any;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

  // Deploy ProjectContract
  const ProjectContractFactory = await ethers.getContractFactory('ProjectContract');
  const projectContract = await ProjectContractFactory.deploy();

  // Deploy BidContract
  const BidContractFactory = await ethers.getContractFactory('BidContract');
  bidContract = await BidContractFactory.deploy(projectContract.address);

  describe('getBidStruct', function () {
    it('should return an empty array if no bids have been placed', async function () {
      const projectId = 0;
      const bids = await bidContract.getBidStruct(projectId);
      expect(bids).to.be.an('array').that.is.empty;
    });

    it('should return an array of bids if bids have been placed', async function () {
      const projectId = 0;
      const bidAmount = ethers.utils.parseEther('1.0');

      // Place a bid
      await bidContract.placeBid(projectId, { value: bidAmount });

      // Get the bid struct
      const bids = await bidContract.getBidStruct(projectId);

      expect(bids).to.be.an('array').that.has.lengthOf(1);
      expect(bids[0].bidder).to.equal(owner.address);
      expect(bids[0].amount).to.equal(bidAmount);
      expect(bids[0].timestamp).to.be.a('big number');
      expect(bids[0].projectId).to.equal(projectId);
    });
  });
});
})
