import {  useWaitForTransactionReceipt, useWriteContract } from 'wagmi';


const useContract = () => {
  const { 
    data: hash, 
    isPending, 
    writeContract 
    } = useWriteContract() 
    
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

  const deployToken = (remoteToken: string, tokenName: string, tokenSymbol: string) => {
      writeContract({ address: '0x', abi: [], functionName: 'beBased', args: [remoteToken, tokenName, tokenSymbol]});
  };


  return {
      deployToken,
      isPending,
    isConfirmed,
    isConfirming
  };
};

export default useContract;
