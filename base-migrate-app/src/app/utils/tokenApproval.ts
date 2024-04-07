/**
 * Requirements:
 * 1. Helper function to give approval for different tokens
 */
import { wagmiConfig } from '@/config/rainbowkit';
import { getAccount } from '@wagmi/core';
import { Address, erc20Abi } from 'viem'
import { useReadContract, useWriteContract } from 'wagmi';
import { getUniswapRouterAddress } from './uniswap';
import { getAerodromeRouterAddress } from './aerodrome';

/**
 * @notice set new appoval for spender from connected wallet addreess
 * @param token token address
 * @param spender spender address
 * @param amount amount of allowance to set
 */
export async function approve(token: Address, spender: Address, amount: bigint) {
    const { writeContract, error, isError } = useWriteContract();

    writeContract({
        abi: erc20Abi,
        address: token,
        functionName: "approve",
        args: [
            spender,
            amount
        ]
    });

    return {error, isError};
}

/**
 * @notice fetch the current allowance set for spender by owner address
 * @param token token address
 * @param owner owner address
 * @param spender spender address
 * @returns 
 */
export async function getAllowance(token: Address, owner: Address, spender: Address): Promise<bigint | undefined> {
    const { data } = useReadContract({
        abi: erc20Abi,
        address: token,
        functionName: 'allowance',
        args: [
            owner, spender
        ]
      });
      return data;
}

/**
 * @notice set new appoval for Uniswap Router from connected wallet addreess
 * @param token token address
 * @param amount amount of allowance to set
 */
export async function approveUniswap(token: Address, amount: bigint) {
    const { writeContract, error, isError } = useWriteContract();
    const { chainId } = getAccount(wagmiConfig);

    writeContract({
        abi: erc20Abi,
        address: token,
        functionName: "approve",
        args: [
            getUniswapRouterAddress(chainId),
            amount
        ]
    });

    return {error, isError};
}

/**
 * @notice fetch the current allowance set for Uniswap Router by owner address
 * @param token token address
 * @param owner owner address
 * @returns 
 */
export async function getAllowanceForUniswap(token: Address, owner: Address): Promise<bigint | undefined> {
    const { chainId } = getAccount(wagmiConfig);

    const { data } = useReadContract({
        abi: erc20Abi,
        address: token,
        functionName: 'allowance',
        args: [
            owner, getUniswapRouterAddress(chainId)
        ]
      });
      return data;
}

/**
 * @notice set new appoval for Aerodrome Router from connected wallet addreess
 * @param token token address
 * @param amount amount of allowance to set
 */
export async function approveAerodrome(token: Address, amount: bigint) {
    const { writeContract, error, isError } = useWriteContract();
    const { chainId } = getAccount(wagmiConfig);

    writeContract({
        abi: erc20Abi,
        address: token,
        functionName: "approve",
        args: [
            getAerodromeRouterAddress(chainId),
            amount
        ]
    });

    return {error, isError};
}

/**
 * @notice fetch the current allowance set for Aerodrom Router by owner address
 * @param token token address
 * @param owner owner address
 * @returns 
 */
export async function getAllowanceForAerodrome(token: Address, owner: Address): Promise<bigint | undefined> {
    const { chainId } = getAccount(wagmiConfig);

    const { data } = useReadContract({
        abi: erc20Abi,
        address: token,
        functionName: 'allowance',
        args: [
            owner, getAerodromeRouterAddress(chainId)
        ]
      });
      return data;
}