// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Token {
    uint public totalSupply;
    string public name = "SHAWK";
    string public symbol = "SHK";
    uint8 public decimals = 18;

    mapping(address => uint256) public balances;

    event Transfer(address sender, address receiver, uint256 amount);

    constructor() {
        totalSupply = 1000 * (10 ** 18);
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address requester) external view returns (uint256) {
        return balances[requester];
    }

    function transfer(address recipient, uint amount) public returns (bool) {
        require(balances[msg.sender] >= amount);

        decreaseBalance(amount);
        increaseBalance(recipient, amount);

        emit Transfer(msg.sender, recipient, amount);

        return true;
    }

    function decreaseBalance(uint256 _value) private {
        balances[msg.sender] -= _value;
    }

    function increaseBalance(address recipient, uint256 _value) private {
        balances[recipient] += _value;
    }
}
