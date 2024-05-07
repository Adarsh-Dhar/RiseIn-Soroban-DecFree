import { ethers } from 'hardhat';
import { expect } from 'chai';
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

const projectContractTest = () => {
    describe("Bid", async function runEveryTime() {
        it("should revert if freelancer has no balance", async function () {

            const amount = ethers.constants.Zero;

            const BidContract = await ethers.getContractFactory("Bid");
            const bid = await BidContract.deploy();
            const ProjectContract = await ethers.getContractFactory("Project");
            const project = await ProjectContract.deploy();

            return {bid, project};
        })
        describe("Deployment", async function () {
            it("should revert if freelancer has no balance", async function () {
                const { bid } = await loadFixture(runEveryTime);

                const amount = ethers.constants.Zero;

                // Assert that the balance of the bidder address is equal to 0
                try {
                    await expect(await bid.bidder.balance).to.equal(amount);
                } catch (error) {
                    // If the balance is equal to 0, the test should revert
                    expect(error).to.throw("Balance is equal to 0");
                }
            })
        })

        describe("Deployment", async function () {
            it("should check it the timestamp is valid", async function () {
                const { bid } = await loadFixture(runEveryTime);

                const currentTimestamp = Math.floor(Date.now() / 1000);
                const bidderTimestamp = bid.timestamp;

                expect(bidderTimestamp).to.be.gte(currentTimestamp, "Bidder's timestamp is earlier than the current timestamp");

                
            })
        })

        describe("Deployment",async function(){
            it("should check if the project exists",async function(){
                const { project,bid } = await loadFixture(runEveryTime);

                const projectId = project.projectId;

                const checkProjectId = bid.projectId;

                expect(checkProjectId).to.equal(projectId,"Project does not exist");

                
            })
        })

        
    })
}
