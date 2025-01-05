// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Hackathon {
    struct Project {
        string title;
        uint[] ratings;
    }

    Project[] projects;

    function findWinner() external view returns (Project memory) {
        uint max_avg = 0;
        Project memory project;
        for (uint i = 0; i < projects.length; i++) {
            uint sum = 0;
            for (uint j = 0; j < projects[i].ratings.length; j++) {
                sum += projects[i].ratings[j];
            }
            if (sum / projects[i].ratings.length > max_avg) {
                max_avg = sum / projects[i].ratings.length;
                project = projects[i];
            }
        }

        return project;
    }

    function newProject(string calldata _title) external {
        // creates a new project with a title and an empty ratings array
        projects.push(Project(_title, new uint[](0)));
    }

    function rate(uint _idx, uint _rating) external {
        // rates a project by its index
        projects[_idx].ratings.push(_rating);
    }
}
