import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { getAccount } from '@wagmi/core';
import { wagmiConfig } from '@/config/rainbowkit';
import MigrateFactory from '@/config/addresses';
import BasedERC20Factory from '@/config/abis/BasedERC20Factory.json';

const useContract = () => {
  const { chainId } = getAccount(wagmiConfig);
  const { data: hash, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const sepoliaFactory = chainId === 84532 && MigrateFactory?.sepolia;

  const deployToken = (remoteToken: string, tokenName: string, tokenSymbol: string) => {
    writeContract({
      address: sepoliaFactory,
      abi: BasedERC20Factory.abi,
      functionName: 'beBased',
      args: [remoteToken, tokenName, tokenSymbol],
    });
  };

  return {
    deployToken,
    isPending,
    isConfirmed,
    isConfirming,
  };
};

export default useContract;
