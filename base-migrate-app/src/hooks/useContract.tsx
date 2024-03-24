import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { getTransactionReceipt } from '@wagmi/core';
import { useChainId } from 'wagmi';

import { wagmiConfig } from '@/config/rainbowkit';
import MigrateFactory from '@/config/addresses';
import OptimismMintableERC20Factory from '@/config/abis/OptimismMintableERC20Factory.json';

const useContract = () => {
  const chainId = useChainId();
  const { data: hash, isPending, writeContract } = useWriteContract();

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const factory =
    chainId === 84532 ? MigrateFactory?.base_sepolia : chainId === 8453 && MigrateFactory.base;

  const deployToken = (remoteToken: string, tokenName: string, tokenSymbol: string) => {
    writeContract({
      address: factory,
      abi: OptimismMintableERC20Factory.abi,
      functionName: 'createStandardL2Token',
      args: [remoteToken, tokenName, tokenSymbol],
    });
  };

  const getTransactionData = () => {
    let transactionData;
    if (hash) {
      transactionData = getTransactionReceipt(wagmiConfig, { hash, chainId });
    }
    return transactionData;
  };

  return {
    deployToken,
    isPending,
    isConfirmed,
    getTransactionData,
  };
};

export default useContract;
