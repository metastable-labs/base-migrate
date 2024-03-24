/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState, useMemo } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { useCookies } from 'react-cookie';
import useConnect from '@/hooks/useConnect';
import { supportedNetworks } from '@/config/rainbowkit';

import { Button, ClickAnimation, Container } from '..';
import {
  BetaIcon,
  DropdownIcon,
  Logo,
  MenuIcon,
  MetamaskIcon,
  SmallLogo,
} from '../../../public/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import SwitchNetwork from './switch-network';
import MenuComponent from './menu';
import DisconnectNetwork from './disconnect-network';

const Header = () => {
  const { navigate, pathname } = useSystemFunctions();
  const { connectModal } = useConnect();
  const chainId = useChainId();
  const { isConnected, isDisconnected, address } = useAccount();
  const [cookies] = useCookies(['authtoken']);

  const [showNetworks, setShowNetworks] = useState(false);
  const [showDisconnect, setShowDisconnect] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const currentNetwork = useMemo(() => {
    const network = supportedNetworks.find((network) => network.chainId === chainId);

    return network;
  }, [chainId, showNetworks]);

  const authToken = cookies?.authtoken;
  const route = authToken && isConnected ? '/migrate' : '/home';

  return (
    <>
      <Container
        variant={pathname === '/' ? 'home' : 'dash'}
        classes="md:border-b md:border-white-150">
        <header className="h-[11vh] flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <ClickAnimation onClick={() => navigate.push('/')} classes="flex items-center gap-2">
                <div className="hidden md:block">
                  <Logo />
                </div>
                <div className="md:hidden">
                  <SmallLogo />
                </div>
                <div className="text-xs md:text-xl text-black-100 font-medium">Base Migrate</div>
              </ClickAnimation>

              <div className="ml-2.5 md:ml-5">
                <BetaIcon />
              </div>
            </div>

            {!isConnected || !address || isDisconnected ? (
              <Button
                onClick={() => (pathname === '/' ? navigate.push(route) : connectModal())}
                text={pathname === '/' ? 'Migrate to base' : 'Connect wallet'}
              />
            ) : (
              <div>
                <div className="items-center justify-end gap-4 md:gap-10 hidden md:flex">
                  <ClickAnimation
                    onClick={() => setShowNetworks(true)}
                    classes="flex items-center gap-2">
                    {currentNetwork?.icon}
                    <div className="text-[10px] md:text-xs text-black-350 mt-0.5">
                      {currentNetwork?.name}
                    </div>
                    <div className="md:ml-3">
                      <DropdownIcon />
                    </div>
                  </ClickAnimation>

                  <ClickAnimation
                    onClick={() => setShowDisconnect(true)}
                    classes="flex items-center gap-2">
                    <MetamaskIcon />
                    <div>
                      <div className="text-[10px] md:text-xs text-black-250 font-medium">
                        Metamask
                      </div>
                      <div className="text-[10px] md:text-xs text-black-350 mt-0.5">
                        {address.slice(0, 6)}...{address.slice(-4)}
                      </div>
                    </div>
                    <div className="md:ml-3">
                      <DropdownIcon />
                    </div>
                  </ClickAnimation>
                </div>

                <ClickAnimation classes="md:hidden" onClick={() => setOpenMenu(true)}>
                  <MenuIcon />
                </ClickAnimation>
              </div>
            )}
          </div>
        </header>
      </Container>

      {isConnected && address && showNetworks && !isDisconnected && (
        <SwitchNetwork setShowNetworks={setShowNetworks} />
      )}

      {isConnected && address && showDisconnect && !isDisconnected && (
        <DisconnectNetwork setShowNetworks={setShowDisconnect} />
      )}

      <MenuComponent isOpen={openMenu} setIsOpen={setOpenMenu} />
    </>
  );
};

export default Header;
