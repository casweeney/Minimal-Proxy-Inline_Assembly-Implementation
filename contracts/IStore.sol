// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

interface IStore {
    function value() external view returns (string memory);
    function setValue(string calldata _value) external;
}