// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/OptimismMintableERC20.sol";

contract DeployToken is Script {
    function run(
        address _remoteToken,
        string memory _name,
        string memory _symbol
    ) external broadcast {
        vm.startBroadcast();
        string memory deployConfigJson = getDeployConfigJson();

        address _bridge = deployConfigJson.readUint(".L2StandardBridge");
        OptimismMintableERC20 opTokenContract = new OptimismMintableERC20(
            _bridge,
            _remoteToken,
            _name,
            _symbol
        );

        vm.stopBroadcast();
    }

    function getDeployConfigJson() internal view returns (string memory json) {
        json = vm.readFile(
            string.concat(vm.projectRoot(), "/deployConfigs/base.json")
        );
    }
}
