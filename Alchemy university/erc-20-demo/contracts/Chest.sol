// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IERC20.sol";

contract Chest {
    function plunder(address[] calldata erc20s) external {
        for (uint i = 0; i < erc20s.length; i++) {
            IERC20 erc20Token = IERC20(erc20s[i]);
            erc20Token.transfer(
                msg.sender,
                erc20Token.balanceOf(address(this))
            );
        }
    }
}
