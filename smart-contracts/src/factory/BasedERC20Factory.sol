// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// ██████╗░░█████╗░░██████╗███████╗██████╗░  ███╗░░░███╗██╗░██████╗░██████╗░░█████╗░████████╗███████╗
// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗  ████╗░████║██║██╔════╝░██╔══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██████╦╝███████║╚█████╗░█████╗░░██║░░██║  ██╔████╔██║██║██║░░██╗░██████╔╝███████║░░░██║░░░█████╗░░
// ██╔══██╗██╔══██║░╚═══██╗██╔══╝░░██║░░██║  ██║╚██╔╝██║██║██║░░╚██╗██╔══██╗██╔══██║░░░██║░░░██╔══╝░░
// ██████╦╝██║░░██║██████╔╝███████╗██████╔╝  ██║░╚═╝░██║██║╚██████╔╝██║░░██║██║░░██║░░░██║░░░███████╗
// ╚═════╝░╚═╝░░╚═╝╚═════╝░╚══════╝╚═════╝░  ╚═╝░░░░░╚═╝╚═╝░╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░╚══════╝

import {BasedMigrateERC20} from "../BasedMigrateERC20.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";

/**
 * @title BasedERC20Factory
 * @notice Factory contract for creating and deploying BasedMigrateERC20 tokens.
 */
contract BasedERC20Factory {
    /**
     * @notice Returns the version of the BasedERC20Factory contract
     */
    string public constant version = "1.0.0";

    /**
     * @notice Address of the BasedMigrateERC20 implementation on this chain.
     */
    address public immutable basedMigrateErc20;

    /**
     * @notice Address of the StandardBridge on this chain.
     */
    address public immutable BRIDGE;

    /**
     * @dev Emitted when a remote token address is zero.
     */
    error RemoteTokenCannotBeZeroAddress();
    /**
     * @dev Emitted when the bridge address provided is the zero address.
     */
    error BridgeAddressCannotBeZero();
    /**
     * @dev Emitted when the implementation address provided is the zero
     */
    error ImplementationCannotBeNull();

    /**
     * @dev Emitted when a new BasedMigrateERC20 token is created.
     * @param remoteToken Address of the remote token.
     * @param localToken Address of the newly created local token.
     * @param deployer Address of the deployer.
     */
    event BasedMigrateERC20Created(address indexed remoteToken, address indexed localToken, address deployer);

    /**
     * @notice constructor
     * @param _implementation Address of the BasedMigrateERC20 implementation.
     * @param _bridge Address of the StandardBridge.
     */
    constructor(address _implementation, address _bridge) {
        if (_bridge == address(0)) revert BridgeAddressCannotBeZero();
        if (_implementation == address(0)) revert ImplementationCannotBeNull();
        basedMigrateErc20 = _implementation;
        BRIDGE = _bridge;
    }

    /**
     * @notice Deploys a new BasedMigrateERC20 token clone with specified parameters.
     * @param _remoteToken Address of the remote token to be based on.
     * @param _name Name for the new token.
     * @param _symbol Symbol for the new token.
     * @return Address of the newly deployed BasedMigrateERC20 token.
     * @param _decimals    ERC20 decimals
     */
    function beBased(address _remoteToken, string memory _name, string memory _symbol, uint8 _decimals)
        external
        returns (address)
    {
        if (_remoteToken == address(0)) {
            revert RemoteTokenCannotBeZeroAddress();
        }
        // deploy clone
        address newBasedERC20 = Clones.clone(basedMigrateErc20);

        // initialize clone
        BasedMigrateERC20(newBasedERC20).initialize(BRIDGE, _remoteToken, _name, _symbol, _decimals);

        emit BasedMigrateERC20Created(_remoteToken, newBasedERC20, msg.sender);

        // return
        return newBasedERC20;
    }
}
