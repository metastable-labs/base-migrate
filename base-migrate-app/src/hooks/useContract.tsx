import { useWaitForTransactionReceipt, useWriteContract, useChainId } from 'wagmi';
import { getTransactionReceipt } from '@wagmi/core';

import { wagmiConfig } from '@/config/rainbowkit';
import MigrateFactory from '@/config/addresses';
import OptimismMintableERC20Factory from '@/config/abis/OptimismMintableERC20Factory.json';
import BasedERC20Factory from '@/config/abis/BasedERC20Factory.json';
import BasedERC20FactoryMain from '@/config/abis/BasedERC20FactoryMain.json';

const useContract = () => {
  const chainId = useChainId();
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const factory =
    chainId === 84532
      ? MigrateFactory?.based_migrate_factory_sepolia
      : chainId === 8453 && MigrateFactory.base;

  const funcName = chainId === 84532 ? 'beBased' : chainId === 8453 ? 'createStandardL2Token' : '';

  const abiParam =
    chainId === 84532
      ? BasedERC20Factory.abi
      : chainId === 8453
        ? OptimismMintableERC20Factory.abi
        : [''];

  const deployToken = (remoteToken: string, tokenName: string, tokenSymbol: string) => {
    writeContract({
      address: factory,
      abi: abiParam,
      functionName: funcName,
      args: [remoteToken, tokenName, tokenSymbol],
    });
  };

  const deployTokenWithDecimal = (
    remoteToken: string,
    tokenName: string,
    tokenSymbol: string,
    tokenDecimal: string,
  ) => {
    writeContract({
      address: MigrateFactory.based_migrate_factory,
      abi: BasedERC20FactoryMain.abi,
      functionName: 'beBased',
      args: [remoteToken, tokenName, tokenSymbol, Number(tokenDecimal)],
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
    deployTokenWithDecimal,
    error,
    hash,
  };
};

export default useContract;
