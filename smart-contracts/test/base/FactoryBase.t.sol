pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {BasedERC20Factory} from "../../src/factory/BasedERC20Factory.sol";
import {MockRemoteERC20} from "../../src/mocks/MockRemoteERC20.sol";
import {BasedMigrateERC20} from "../../src/BasedMigrateERC20.sol";

contract FactoryBase is Test {
    BasedERC20Factory public factory;
    BasedMigrateERC20 public implementation;

    address public bridge = makeAddr("bridge");
    MockRemoteERC20 public remote;

    function setUp() public {
        implementation = new BasedMigrateERC20();
        remote = new MockRemoteERC20();
        factory = new BasedERC20Factory(address(implementation), bridge);
    }
}
