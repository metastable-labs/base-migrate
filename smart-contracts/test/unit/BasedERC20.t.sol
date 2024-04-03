pragma solidity 0.8.20;

import {BasedERC20Base, BasedMigrateERC20} from "../base/BasedERC20Base.t.sol";
import {IERC165} from "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol";
import {IERC721} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {ILegacyMintableERC20, IOptimismMintableERC20} from "../../src/interface/IOptimismMintableERC20.sol";

contract BasedERC20Test is BasedERC20Base {
    function test_revert_cannotInitializeImplementation() public {
        vm.expectRevert();
        implementation.initialize(bridge, address(remoteToken), tokenName, tokenSymbol, tokenDecimal);
    }

    function test_cloneWillBeInitialized() public {
        clone.initialize(bridge, address(remoteToken), tokenName, tokenSymbol, tokenDecimal);
        assertEq(clone.BRIDGE(), bridge);
        assertEq(clone.bridge(), bridge);
        assertEq(clone.l2Bridge(), bridge);
        assertEq(clone.REMOTE_TOKEN(), address(remoteToken));
        assertEq(clone.remoteToken(), address(remoteToken));
        assertEq(clone.l1Token(), address(remoteToken));
        assertEq(clone.version(), currentVersion);
    }

    function test_revert_cannotReinitialize() public {
        // initialize once
        clone.initialize(bridge, address(remoteToken), tokenName, tokenSymbol, tokenDecimal);

        // revert when reinitialize
        vm.expectRevert();
        clone.initialize(bridge, address(remoteToken), tokenName, tokenSymbol, tokenDecimal);
    }

    function test_initializationWithZeroAddressForRemoteToken() public {
        // note: This is not good, but the factory contract has a check to ensure remote token is never zero
        // this done to revert the transaction before deployment
        // incase remote token is passed as zero

        // initialize once
        clone.initialize(bridge, address(0), tokenName, tokenSymbol, tokenDecimal);
        assertEq(clone.REMOTE_TOKEN(), address(0));
        assertEq(clone.remoteToken(), address(0));
        assertEq(clone.l1Token(), address(0));
    }

    function test_initializationWithZeroAddressForBridge() public {
        // note: This is not good, but the factory contract has a check to ensure bridge is never zero
        // this done to revert the transaction before deployment
        // incase bridge is passed as zero

        // initialize once
        clone.initialize(address(0), address(remoteToken), tokenName, tokenSymbol, tokenDecimal);
        assertEq(clone.BRIDGE(), address(0));
        assertEq(clone.bridge(), address(0));
        assertEq(clone.l2Bridge(), address(0));
    }

    function test_revert_mintFromNonBridge() public initializeBasedERC20 {
        // prepare args
        address to = makeAddr("to");
        uint256 amount = 100;

        // cannot mint
        vm.expectRevert(BasedMigrateERC20.OnlyBridgeAllowed.selector);
        vm.prank(nonBridge);
        clone.mint(to, amount);
    }

    function test_mintFromBridge() public initializeBasedERC20 {
        // prepare args
        address to = makeAddr("to");
        uint256 amount = 100;

        // can mint
        vm.prank(bridge);
        clone.mint(to, amount);
        assertEq(clone.balanceOf(to), amount);
        assertEq(clone.totalSupply(), amount);
    }

    function test_fuzz_mintFromBridge(address to, uint256 amount) public initializeBasedERC20 {
        // prepare args
        // ERC20 natively will nevert mint tokens to address(0);
        vm.assume(to != address(0));

        // can mint
        vm.prank(bridge);
        clone.mint(to, amount);
        assertEq(clone.balanceOf(to), amount);
        assertEq(clone.totalSupply(), amount);
    }

    function test_revert_burnFromNonBridge() public initializeBasedERC20 {
        // prepare args
        address to = makeAddr("to");
        uint256 amount = 100;

        // first mint
        vm.prank(bridge);
        clone.mint(to, amount);

        // cannot burn
        vm.expectRevert(BasedMigrateERC20.OnlyBridgeAllowed.selector);
        vm.prank(nonBridge);
        clone.burn(to, amount);
    }

    function test_burnFromBridge() public initializeBasedERC20 {
        // prepare args
        address to = makeAddr("to");
        uint256 amount = 100;

        // first mint
        vm.prank(bridge);
        clone.mint(to, amount);
        assertEq(clone.balanceOf(to), amount);
        assertEq(clone.totalSupply(), amount);

        // can burn
        vm.prank(bridge);
        clone.burn(to, amount);
        assertEq(clone.balanceOf(to), 0);
        assertEq(clone.totalSupply(), 0);
    }

    function test_fuzz_burnFromBridge(address from, uint256 mintAmount, uint256 burnAmount)
        public
        initializeBasedERC20
    {
        // prepare args
        // ERC20 natively will nevert mint tokens to address(0);
        vm.assume(from != address(0));
        burnAmount = bound(burnAmount, 0, mintAmount);

        // first mint
        vm.prank(bridge);
        clone.mint(from, mintAmount);
        assertEq(clone.balanceOf(from), mintAmount);
        assertEq(clone.totalSupply(), mintAmount);

        // can burn
        vm.prank(bridge);
        clone.burn(from, burnAmount);
        assertEq(clone.balanceOf(from), mintAmount - burnAmount);
        assertEq(clone.totalSupply(), mintAmount - burnAmount);
    }

    function test_revert_burnFromAccountWithNoToken() public initializeBasedERC20 {
        // prepare args
        address to = makeAddr("to");
        uint256 amount = 100;

        // can burn
        vm.expectRevert();
        vm.prank(bridge);
        clone.burn(to, amount);
    }

    function test_revert_burnMoreThanBalance() public initializeBasedERC20 {
        // prepare args
        address to = makeAddr("to");
        uint256 amount = 100;

        // first mint
        vm.prank(bridge);
        clone.mint(to, amount);
        assertEq(clone.balanceOf(to), amount);
        assertEq(clone.totalSupply(), amount);

        // can burn
        vm.expectRevert();
        vm.prank(bridge);
        clone.burn(to, amount + 1);
        assertEq(clone.balanceOf(to), amount);
        assertEq(clone.totalSupply(), amount);
    }

    function test_supportsERC165Interface() public initializeBasedERC20 {
        assertEq(clone.supportsInterface(type(IERC165).interfaceId), true);
        assertEq(clone.supportsInterface(type(ILegacyMintableERC20).interfaceId), true);
        assertEq(clone.supportsInterface(type(IOptimismMintableERC20).interfaceId), true);

        // invalid interface ids
        assertEq(clone.supportsInterface(type(IERC721).interfaceId), false);
    }
}
