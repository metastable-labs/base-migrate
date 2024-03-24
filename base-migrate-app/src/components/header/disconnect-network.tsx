/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import { disconnect } from '@wagmi/core';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { MenuDropdown } from '..';
import { DisconnectIcon } from '../../../public/icons';
import { wagmiConfig } from '@/config/rainbowkit';

const DisconnectNetwork = ({ setShowNetworks }: { setShowNetworks: (val: boolean) => void }) => {
  const { navigate } = useSystemFunctions();

  const disconnectNetwork = async () => {
    await disconnect(wagmiConfig);

    navigate.push('/');
    setShowNetworks(false);
  };
  return (
    <MenuDropdown classes="right-5 md:right-10" onClick={() => setShowNetworks(false)}>
      <div onClick={disconnectNetwork} className="flex flex-col gap-7 cursor-pointer">
        <DisconnectIcon />
      </div>
    </MenuDropdown>
  );
};

export default DisconnectNetwork;
