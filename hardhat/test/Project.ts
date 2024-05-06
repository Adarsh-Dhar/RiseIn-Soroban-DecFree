import { ethers } from "hardhat";
import { expect } from "chai";

export const projectContractTest = () => {
    
    let projectContract : any;
    let owner;

    beforeEach(async () => {
        [owner] = await ethers.getSigners();
        const ProjectContract = await ethers.getContractFactory("ProjectContract");
        projectContract = await ProjectContract.deploy();
        await projectContract.deployed();
    });

    it("should revert when no project is found", async () => {
        // Call a function that should revert
        await expect(projectContract.getProject(0)).to.be.reverted ;
    });
}