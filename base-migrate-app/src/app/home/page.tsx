/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import { useAccount } from 'wagmi';

import ConnectWallet from './connect-wallet';
import ConnectGithub from './connect-github';
import { MobileView } from '@/components';
import classNames from 'classnames';

const HomePage = () => {
  const { isConnected } = useAccount();

  return (
    <>
      <MobileView />
      <div
        className={classNames('min-h-[89vh] hidden lg:flex flex-col', {
          'justify-start items-start': isConnected,
          'justify-center items-center': !isConnected,
        })}>
        {!isConnected && <ConnectWallet />}

        {isConnected && <ConnectGithub />}
      </div>
    </>
  );
};

export default HomePage;
