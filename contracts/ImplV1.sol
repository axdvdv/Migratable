// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ImplementationV1 {
    uint256 public storageNumber;

    function getName() external pure virtual returns (string memory) {
        return "ImplementationV1";
    }

    function setNumber(uint256 number) external {
        storageNumber = number;
    }

    function getNumber() external view returns (uint256) {
        return storageNumber;
    }

    function getSender() external view returns (address) {
        return msg.sender;
    }
}
