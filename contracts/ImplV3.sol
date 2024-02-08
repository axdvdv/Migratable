// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "./ImplV2.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Utils.sol";

contract ImplementationV3 is ImplementationV2 {
    function getName() external pure override returns (string memory) {
        return "ImplementationV3";
    }
}
