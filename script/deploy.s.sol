// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/OptimismMintableERC20.sol";
import {Script, stdJson, console2} from "forge-std/Script.sol";

contract DeployScript is Script {
    using stdJson for string;

    function run(
        address _remoteToken,
        string memory _name,
        string memory _symbol
    ) external {
        string memory deployConfigJson = getDeployConfigJson();

        ERC20 _bridge = ERC20(
            deployConfigJson.readAddress(".L2StandardBridge")
        );
        OptimismMintableERC20 opTokenContract = new OptimismMintableERC20(
            address(_bridge),
            _remoteToken,
            _name,
            _symbol
        );
    }

    function getDeployConfigJson() internal view returns (string memory json) {
        json = vm.readFile(
            string.concat(vm.projectRoot(), "/deployConfigs/base.json")
        );
    }
}
