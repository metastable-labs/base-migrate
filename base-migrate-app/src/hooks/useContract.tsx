import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { getAccount, getTransactionReceipt } from '@wagmi/core';
import { wagmiConfig } from '@/config/rainbowkit';
import MigrateFactory from '@/config/addresses';
import BasedERC20Factory from '@/config/abis/BasedERC20Factory.json';
import React from 'react';

const useContract = () => {
  const { chainId } = getAccount(wagmiConfig);
  const { data: hash, isPending, writeContract } = useWriteContract();

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const sepoliaFactory = chainId === 84532 && MigrateFactory?.base_sepolia;

  const deployToken = (remoteToken: string, tokenName: string, tokenSymbol: string) => {
    const info = writeContract({
      address: sepoliaFactory,
      abi: BasedERC20Factory.abi,
      functionName: 'beBased',
      args: [remoteToken, tokenName, tokenSymbol],
    });
    console.log(info, 'here');
  };

  const getTransactionData = () => {
    let transactionData;
    if (hash) {
      transactionData = getTransactionReceipt(wagmiConfig, { hash, chainId });
      console.log(transactionData);
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
