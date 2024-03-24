import React, { useState, useEffect } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { motion } from 'framer-motion';
import { useCookies } from 'react-cookie';
import useConnect from '@/hooks/useConnect';
import { disconnect } from '@wagmi/core';

import { CancelIcon, DisconnectIcon, DropdownIcon, MetamaskIcon } from '../../../public/icons';
import { Button, ClickAnimation } from '..';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { Network, supportedNetworks, wagmiConfig } from '@/config/rainbowkit';
import SwitchNetwork from './switch-network';

interface IMenu {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MenuComponent = ({ isOpen, setIsOpen }: IMenu) => {
  const { isConnected, isDisconnected, address } = useAccount();
  const { connectModal } = useConnect();
  const { navigate, pathname } = useSystemFunctions();
  const [cookies] = useCookies(['authtoken']);
  const chainId = useChainId();

  const [currentNetwork, setCurrentNetwork] = useState<Network>();
  const [showNetworks, setShowNetworks] = useState(false);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '100%' },
  };

  const authToken = cookies?.authtoken;
  const route = authToken && isConnected ? '/migrate' : '/home';

  const disconnectNetwork = async () => {
    await disconnect(wagmiConfig);

    navigate.push('/');
    setIsOpen(false);
    setShowNetworks(false);
  };

  useEffect(() => {
    if (chainId) {
      const network = supportedNetworks.find((network) => network.chainId === chainId);

      setCurrentNetwork(network);
    }
  }, [chainId, isConnected, isDisconnected, address]);

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      transition={{
        duration: 1,
        type: 'spring',
        stiffness: 60,
      }}
      className="fixed inset-0 bg-white-50 z-50 min-h-screen flex flex-col justify-between w-full py-10 px-6">
      <div>
        <div>
          <div className="flex justify-between items-center">
            <h4 className="text-3xl font-bold text-grey-700">Menu</h4>
            <ClickAnimation onClick={() => setIsOpen(false)}>
              <CancelIcon />
            </ClickAnimation>
          </div>
        </div>

        <div className="mt-10">
          {!isConnected || !address || isDisconnected ? (
            <Button
              onClick={() => (pathname === '/' ? navigate.push(route) : connectModal())}
              text={pathname === '/' ? 'Migrate to base' : 'Connect wallet'}
            />
          ) : (
            <div>
              <div className="flex flex-col gap-10">
                <ClickAnimation
                  onClick={() => setShowNetworks(true)}
                  classes="flex items-center gap-2">
                  {currentNetwork?.icon}
                  <div className="text-lg text-black-350 mt-0.5">{currentNetwork?.name}</div>
                  <div className="md:ml-3">
                    <DropdownIcon />
                  </div>
                </ClickAnimation>

                <ClickAnimation classes="flex items-center gap-2">
                  <MetamaskIcon />
                  <div>
                    <div className=" text-lg text-black-250 font-medium">Metamask</div>
                    <div className=" text-lg text-black-350 mt-0.5">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </div>
                  </div>
                </ClickAnimation>
              </div>
            </div>
          )}
        </div>
      </div>

      <ClickAnimation
        classes="bg-white-50 p-5 md:p-7 rounded-xl flex flex-col gap-7 border border-grey-200"
        onClick={disconnectNetwork}>
        <DisconnectIcon />
      </ClickAnimation>

      {isConnected && address && showNetworks && !isDisconnected && (
        <SwitchNetwork setShowNetworks={setShowNetworks} />
      )}
    </motion.div>
  );
};

export default MenuComponent;
