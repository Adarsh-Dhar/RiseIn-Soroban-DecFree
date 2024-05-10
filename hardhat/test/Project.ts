import { expect } from 'chai';
import { ethers } from 'hardhat';
const { waffle } = require('ethereum-waffle');

describe('ProjectContract', function () {
  let projectContract : any;
  let client : any;
  let freelancer : any;

  beforeEach(async function () {
    [client, freelancer] = await ethers.getSigners();

    // Deploy ProjectContract
    const ProjectContractFactory = await ethers.getContractFactory('ProjectContract');
    projectContract = await ProjectContractFactory.deploy();
  });

  describe('createProject', function () {
    it('should create a new project', async function () {
      const title = 'Test Project';
      const description = 'This is a test project';
      
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const Threedays = 259200;
      const deadline = currentTimestamp + Threedays;
      const budget = ethers.utils.parseEther("1");
      // Create a new project
      await projectContract.createProject(title, description, budget,deadline);

      // Get the project details
      const projectId = await projectContract.projects.length;
      const project = await projectContract.projects(projectId );

      

      
      expect(project.client).to.equal(client.address);
      expect(project.freelancer).to.equal(ethers.constants.AddressZero);
      expect(project.title).to.equal(title);
      expect(project.description).to.equal(description);
      
      
    });
  });

  describe('Project assignment', function () {
    it('should assign a freelancer to a project', async function () {
      const projectId = await projectContract.projects.length;
      await projectContract.createProject('Test Project', 'This is a test project', 100, 1643723400);

      // Assign a freelancer to the project
      await projectContract.assignFreelancer(projectId - 1, freelancer.address);

      // Get the project details
      const project = await projectContract.projects(projectId - 1);

      expect(project.freelancer).to.equal(freelancer.address);
    });
  });

  describe('Project completion', function () {
    it('should complete a project', async function () {
      const projectId = await projectContract.projects.length;
      await projectContract.createProject('Test Project', 'This is a test project', 100, 1643723400);
      await projectContract.assignFreelancer(projectId - 1, freelancer.address);

      // Complete the project
      await projectContract.completeProject(projectId - 1);

      // Get the project details
      const project = await projectContract.projects(projectId - 1);

      expect(project.status).to.equal('completed');
    });
  });
});