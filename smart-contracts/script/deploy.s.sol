// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../src/BasedMigrateERC20.sol";
import "../src/factory/BasedERC20Factory.sol";
import {Script} from "forge-std/Script.sol";

contract DeployScript is Script {
    function run() external returns (address implementation, address factory) {
        // get pvt key from env file, log associated address
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        address L2BridgeAddress = vm.envAddress("L2_BRIDGE_ADDRESS");

        vm.startBroadcast(privateKey);
        // deploy implementation
        implementation = address(new BasedMigrateERC20());

        // deploy factory
        factory = address(new BasedERC20Factory(address(implementation), L2BridgeAddress));

        vm.stopBroadcast();

        return (implementation, factory);
    }
}
