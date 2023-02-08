// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Store {
    string public value;

    function setValue(string calldata _value) external {
        value = _value;
    }
}