// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Voting {
    mapping(address => bool) validVoters;

    constructor(address[] memory vv) {
        for (uint i = 0; i < vv.length; i++) {
            validVoters[vv[i]] = true;
        }
        validVoters[msg.sender] = true;
    }

    mapping(uint => bool) executedMap;

    event ProposalCreated(uint proposalId);
    event VoteCast(uint proposalId, address voter);

    struct Proposal {
        address target;
        bytes data;
        uint yesCount;
        uint noCount;
    }

    Proposal[] public proposals;

    struct Vote {
        bool voted;
        bool vote;
    }
    mapping(uint => mapping(address => Vote))
        private votesPerAddressPerProposal;

    function newProposal(address target, bytes calldata input) external {
        require(validVoters[msg.sender], "You are not a valid voter member!");
        proposals.push(Proposal(target, input, 0, 0));
        emit ProposalCreated(proposals.length - 1);
    }

    function castVote(uint proposalId, bool vote) external {
        require(validVoters[msg.sender], "You are not a valid voter member!");
        // get vote
        Vote memory voteObj = votesPerAddressPerProposal[proposalId][
            msg.sender
        ];
        emit VoteCast(proposalId, msg.sender);

        // if not voted yet, vote and increment corresponding count
        if (voteObj.voted == false) {
            voteObj.voted = true;
            voteObj.vote = vote;
            _castVote(proposalId, vote);
            votesPerAddressPerProposal[proposalId][msg.sender] = voteObj;
            return;
        }

        // voteObj.voted == true, has already voted
        if (voteObj.vote == vote) {
            // we just return, sender casted same vote, nothing to do
            return;
        }

        // vote now has different value
        voteObj.vote = vote; // update vote
        votesPerAddressPerProposal[proposalId][msg.sender] = voteObj;

        //decrement previous vote count
        if (vote) {
            proposals[proposalId].noCount -= 1;
        } else {
            proposals[proposalId].yesCount -= 1;
        }

        // change vote basically
        _castVote(proposalId, vote);
    }

    function _castVote(uint proposalId, bool vote) internal {
        if (vote) {
            proposals[proposalId].yesCount += 1;
        } else {
            proposals[proposalId].noCount += 1;
        }

        if (executedMap[proposalId]) {
            return; // already executed
        }

        if (proposals[proposalId].yesCount < 10) {
            return; // nothing to execute yet
        }

        (bool success, ) = proposals[proposalId].target.call(
            proposals[proposalId].data
        );
        require(success);
        executedMap[proposalId] = true;
    }
}
