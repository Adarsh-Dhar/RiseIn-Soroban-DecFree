import {ethers} from 'hardhat';
import {expect} from 'chai';
const { loadFixture} = require("@nomicfoundation/hardhat-network-helpers");

const projectContractTest = () => {
    describe("Bid",async function runEveryTime(){
        it("should revert if freelancer has no balance", async function() {
            
            const amount = ethers.constants.Zero ;

            const BidContract = await ethers.getContractFactory("Bid");
            const bid = await BidContract.deploy();

            return bid;
        })
        describe("Deployment", async function(){
            it("should revert if freelancer has no balance",async function(){
                const {bid} = await loadFixture(runEveryTime);

                const amount = ethers.constants.Zero ;

                await expect(bid.connect)
            })
        })
    })
}