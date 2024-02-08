// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "./ImplV1.sol";
import "./Migratable.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Utils.sol";

contract ImplementationV2 is ImplementationV1, Migratable {
    function getName() external pure virtual override returns (string memory) {
        return "ImplementationV2";
    }
}
