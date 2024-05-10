// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Bid.sol";

contract ProjectContract {

    BidContract public bidContract;

    constructor(){
        bidContract = new BidContract();
    }
    // Struct to represent a project
    struct Project {
        uint256 id;
        address client;
        address freelancer;
        string title;
        string description;
        uint256 budget;
        uint256 deadline;
        
        
    }

     mapping(uint256 => Project[]) public projectContracts;

    

    

    // Array to store projects
    Project[] public projects;

    // Events
    event ProjectCreated(uint256 indexed id, address indexed client);
    event ProjectAssigned(uint256 indexed projectId, address indexed freelancer);
    event ProjectCompleted(uint256 indexed projectId);

    // Function to create a new project
    function createProject(string memory _title, string memory _description, uint256 _budget, uint256 _deadline) external {
    // Check if the client has any unassigned projects
    bool hasUnassignedProject = false;
    for (uint256 i = 0; i < projects.length; i++) {
        if (projects[i].client == msg.sender && projects[i].freelancer == address(0)) {
            hasUnassignedProject = true;
            break;
        }
    }

   

    // Create a new project
    Project memory newProject = Project({
        id: projects.length,
        client: msg.sender,
        freelancer: address(0),
        title: _title,
        description: _description,
        budget: _budget,
        deadline: _deadline
        
        // Initialize other project attributes as needed
    });

    // Add the project to the projects array
    projects.push(newProject);

    // Emit ProjectCreated event
    emit ProjectCreated(newProject.id, newProject.client);
}


   // Function to get a project by its ID

  function showAllBids(uint256 _projectId) external view returns(BidContract.Bid[] memory){
        return bidContract.getAllBids(_projectId) ;
  }

    


    function assignFreelancerFromBidders(uint256 _projectId, uint256 _bidderIndex) external {
        require(_projectId < projects.length, "Invalid project ID");
        Project storage project = projects[_projectId];
        require(project.client == msg.sender, "Only the client can assign a freelancer");
        require(project.freelancer == address(0), "Freelancer already assigned");

        BidContract.Bid[] memory bids = bidContract.getAllBids(_projectId);
        
        require(_bidderIndex < bids.length, "Invalid bidder index");

        project.freelancer = bids[_bidderIndex].bidder;
        emit ProjectAssigned(_projectId, bids[_bidderIndex].bidder);
    }



    function getAllProjects(uint256 _id) external view returns(Project[] memory){
        uint256 numProjects = projectContracts[_id].length;
        Project[] memory projectss = new Project[](numProjects);

        for(uint256 i = 0; i < numProjects; i++){
            Project storage project = projectContracts[_id][i];
            projectss[i] = Project({
                id: project.id,
                client: project.client,
                freelancer: project.freelancer,
                title: project.title,
                description: project.description,
                budget: project.budget,
                deadline: project.deadline
                
            });
        }
    }

}

