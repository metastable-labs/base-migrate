/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import { useSwitchChain } from 'wagmi';
import { motion } from 'framer-motion';
import { getAccount } from '@wagmi/core';
import { supportedNetworks, wagmiConfig } from '@/config/rainbowkit';
import classNames from 'classnames';

const SwitchNetwork = ({ setShowNetworks }: { setShowNetworks: (val: boolean) => void }) => {
  const { chainId } = getAccount(wagmiConfig);
  const { switchChain } = useSwitchChain();

  const switchNetwork = (chainId: number) => {
    switchChain({ chainId });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen">
      <div
        onClick={() => setShowNetworks(false)}
        className="z-10 absolute w-full h-full bg-transparent"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="absolute z-50 right-11 md:right-60 top-[72px] md:top-28 min-w-[220px]">
        <div className="bg-white-50 p-5 md:p-7 rounded-xl flex flex-col gap-7 border border-grey-200">
          {supportedNetworks.map((network, index) => (
            <div
              key={index}
              onClick={() => {
                switchNetwork(network.chainId);
                setShowNetworks(false);
              }}
              className="flex items-center gap-4 cursor-pointer">
              {network.icon}
              <div
                className={classNames('text-sm md:text-base text-black-250 font-medium', {
                  'text-grey-250': chainId === network.chainId,
                })}>
                {network.name}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SwitchNetwork;
