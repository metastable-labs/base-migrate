import { erc20Abi } from 'viem';
import { getChainId } from '@wagmi/core';
import { wagmiConfig } from '@/config/rainbowkit';

import { createPublicClient, http } from 'viem';
import { mainnet, sepolia } from 'viem/chains';

const readTokenData = async (tokenAddress: `0x${string}`) => {
  const chainId = getChainId(wagmiConfig);

  const rpcUrl =
    chainId === 84532
      ? 'https://sepolia.gateway.tenderly.co'
      : chainId === 8453
        ? 'https://mainnet.gateway.tenderly.co'
        : undefined;

  if (!rpcUrl) throw new Error('RPC URL not found for the given chainId.');

  const client = createPublicClient({
    chain: chainId === 84532 ? sepolia : chainId === 8453 ? mainnet : undefined,
    transport: http(rpcUrl),
  });

  const decimal = await client.readContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'decimals',
  });
  const name = await client.readContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'name',
  });
  const symbol = await client.readContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'symbol',
  });

  const result = {
    name,
    symbol,
    decimal,
  };

  return result;
};

export default readTokenData;
