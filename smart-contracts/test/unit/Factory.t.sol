pragma solidity 0.8.20;

import {FactoryBase, BasedMigrateERC20, BasedERC20Factory} from "../base/FactoryBase.t.sol";

contract FactoryUnitTest is FactoryBase {
    string constant tokenName = "BeBased";
    string constant tokenSymbol = "BB";

    function test_BeBased() public {
        // prepare args
        address remoteToken = address(remote);

        // deploy new token
        BasedMigrateERC20 newToken = BasedMigrateERC20(factory.beBased(remoteToken, tokenName, tokenSymbol));

        // assert data
        assertEq(newToken.name(), tokenName);
        assertEq(newToken.symbol(), tokenSymbol);
        assertEq(newToken.BRIDGE(), bridge);
        assertEq(newToken.l1Token(), remoteToken);
    }

    function test_revert_CannotBeBasedWithZeroAddress() public {
        // prepare args
        address remoteToken = address(0);

        // expect revert when Remote token address is zero address
        vm.expectRevert(BasedERC20Factory.RemoteTokenCannotBeZeroAddress.selector);
        factory.beBased(remoteToken, tokenName, tokenSymbol);
    }
}
