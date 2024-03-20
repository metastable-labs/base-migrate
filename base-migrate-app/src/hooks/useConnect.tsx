import { removeLocalStorage } from '@/app/utils/storage';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useSwitchChain } from 'wagmi';
import { getAccount } from '@wagmi/core';
import { wagmiConfig } from '@/config/rainbowkit';
import { useEffect } from 'react';

const useConnect = () => {
  const { openConnectModal } = useConnectModal();
  const { isConnected, isDisconnected, connector, address } = useAccount();
  const { chainId } = getAccount(wagmiConfig);
  const { switchChain } = useSwitchChain();

  const connectModal = () => {
    if (isConnected) {
      removeLocalStorage('@descentWalletDisconnected');
      return;
    }

    openConnectModal && openConnectModal();
  };

  const listener = () => {
    if (chainId) {
      const isAcceptedChain = wagmiConfig.chains.find((chain) => chain.id === chainId);

      if (isConnected && !isAcceptedChain) {
        return switchChain && switchChain({ chainId: wagmiConfig.chains[0].id });
      }
    }
  };

  useEffect(() => {
    listener();
  }, [chainId, isConnected, isDisconnected, connector, address]);

  return {
    connectModal,
  };
};

export default useConnect;
