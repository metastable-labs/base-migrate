// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";

import "../contracts/OptimismMintableERC20.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        address _bridgeAddress = vm.envAddress("L2_STANDARD_BRIDGE_ADDRESS");
        string memory _tokenName = vm.envString("TOKEN_NAME");
        string memory _tokenSymbol = vm.envString("TOKEN_SYMBOL");
        address _tokenAddress = vm.envAddress("TOKEN_ADDRESS");

        vm.startBroadcast(deployerPrivateKey);

        new OptimismMintableERC20(
            _bridgeAddress,
            _tokenAddress,
            _tokenName,
            _tokenSymbol
        );

        vm.stopBroadcast();
    }
}
