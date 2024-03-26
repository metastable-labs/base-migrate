pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {BasedMigrateERC20} from "../../src/BasedMigrateERC20.sol";
import {MockRemoteERC20} from "../../src/mocks/MockRemoteERC20.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";

contract BasedERC20Base is Test {
    BasedMigrateERC20 public clone;
    BasedMigrateERC20 public implementation;

    // addresses
    address public bridge = makeAddr("bridge");
    address public nonBridge = makeAddr("nonBridge");
    MockRemoteERC20 public remoteToken;

    string public tokenName = "BeBased";
    string public tokenSymbol = "BeBased";
    uint8 tokenDecimal = 18;
    string public currentVersion = "1.0.0";

    function setUp() public {
        // deploy remote token
        remoteToken = new MockRemoteERC20();

        // deploy implementation
        implementation = new BasedMigrateERC20();

        // create clone
        clone = BasedMigrateERC20(Clones.clone(address(implementation)));
    }

    modifier initializeBasedERC20() {
        clone.initialize(bridge, address(remoteToken), tokenName, tokenSymbol, tokenDecimal);
        _;
    }
}
