// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Utils.sol";

contract Migratable {
    function migrateToBeacon(address newBeacon, address beaconProxy) external {
        // Write a beacon address into BEACON_SLOT
        StorageSlot.getAddressSlot(ERC1967Utils.BEACON_SLOT).value = newBeacon;

        // Rewrite implementation address on beacon proxy address
        StorageSlot
            .getAddressSlot(ERC1967Utils.IMPLEMENTATION_SLOT)
            .value = beaconProxy;
    }
}
