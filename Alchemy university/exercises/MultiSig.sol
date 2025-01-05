// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;
    uint public required;

    struct Transaction {
        address destination;
        uint256 weiValue;
        bool executed;
        uint256 confirmations;
    }

    Transaction[] public transactions;

    mapping(uint => mapping(address => bool)) public confirmations;

    constructor(address[] memory _owners, uint _required) {
        require(
            _owners.length > 0 && _required > 0 && _required <= _owners.length
        );
        owners = _owners;
        required = _required;
    }

    function transactionCount() public view returns (uint) {
        return transactions.length;
    }

    function addTransaction(
        address destination,
        uint256 value
    ) internal returns (uint) {
        transactions.push(Transaction(destination, value, false, 0));
        return transactions.length - 1;
    }

    function confirmTransaction(uint id) public {
        bool canConfirm = false;
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                canConfirm = true;
                break;
            }
        }
        require(canConfirm);

        confirmations[id][msg.sender] = true;
        transactions[id].confirmations++;

        if (isConfirmed(id)) {
            executeTransaction(id);
        }
    }

    function getConfirmationsCount(
        uint transactionId
    ) public view returns (uint256) {
        return transactions[transactionId].confirmations;
    }

    function submitTransaction(address destination, uint value) external {
        uint transactionId = addTransaction(destination, value);
        confirmTransaction(transactionId);
    }

    receive() external payable {}

    function isConfirmed(uint transactionId) public view returns (bool) {
        return getConfirmationsCount(transactionId) >= required;
    }

    function executeTransaction(uint transactionId) public {
        require(isConfirmed(transactionId));

        (bool success, ) = transactions[transactionId].destination.call{
            value: transactions[transactionId].weiValue
        }("");
        require(success, "Failed to execute transaction");

        transactions[transactionId].executed = true;
    }
}
