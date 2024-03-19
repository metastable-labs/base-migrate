'use client';
import React from 'react';
import { useAccount } from 'wagmi';

import useConnect from '@/hooks/useConnect';

import ConnectWallet from './connect-wallet';
import ConnectGithub from './connect-github';

const HomePage = () => {
  const { connectModal } = useConnect();
  const { isConnected, isDisconnected, connector, address } = useAccount();
  return (
    <div className="min-h-[89vh] flex flex-col justify-center items-center">
      {!isConnected && <ConnectWallet />}

      {isConnected && <ConnectGithub />}
    </div>
  );
};

export default HomePage;
