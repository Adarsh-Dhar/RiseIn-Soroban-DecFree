// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Project {
    // Struct to represent a project
    struct Project {
        uint256 id;
        address client;
        address freelancer;
        string title;
        string description;
        uint256 budget;
        uint256 deadline;
        string[] skills;
        // Add more project attributes as needed
        // e.g., status, assignedFreelancer, etc.
    }

    error ProjectNotFound(uint256 projectId);
    error ProjectFailed();
    error deadlineWrong(uint256 deadline);

    

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

    // Revert if the client has an unassigned project
    if (hasUnassignedProject) {
        revert ProjectFailed(); 
    }

    // Create a new project
    Project memory newProject = Project({
        id: projects.length,
        client: msg.sender,
        freelancer: address(0),
        title: _title,
        description: _description,
        budget: _budget,
        deadline: _deadline,
        skills: new string[](0)
        // Initialize other project attributes as needed
    });

    // Add the project to the projects array
    projects.push(newProject);

    // Emit ProjectCreated event
    emit ProjectCreated(newProject.id, newProject.client);
}


    

}
