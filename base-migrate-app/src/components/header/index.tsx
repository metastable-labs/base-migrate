/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import { useAccount } from 'wagmi';

import useConnect from '@/hooks/useConnect';
import { Button, ClickAnimation, Container } from '..';
import { BaseIcon, DropdownIcon, Logo, MetamaskIcon, SmallLogo } from '../../../public/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const Header = () => {
  const { navigate, pathname } = useSystemFunctions();
  const { connectModal } = useConnect();
  const { isConnected, isDisconnected, connector, address } = useAccount();
  return (
    <Container
      variant={pathname === '/' ? 'home' : 'dash'}
      classes="md:border-b md:border-white-150">
      <header className="h-[11vh] flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Logo />
            </div>
            <div className="md:hidden">
              <SmallLogo />
            </div>

            <div className="text-xs md:text-xl text-black-100 font-medium">Base Migrate</div>
          </div>

          {!isConnected || !address || isDisconnected ? (
            <Button
              onClick={() => (pathname === '/' ? navigate.push('/home') : connectModal())}
              text={pathname === '/' ? 'Migrate to base' : 'Connect wallet'}
            />
          ) : (
            <div className="flex items-center justify-end gap-4 md:gap-10">
              <ClickAnimation classes="flex items-center gap-2">
                <BaseIcon />
                <div className="text-[10px] md:text-xs text-black-350 mt-0.5">Base</div>
                <div className="md:ml-3">
                  <DropdownIcon />
                </div>
              </ClickAnimation>

              <ClickAnimation classes="flex items-center gap-2">
                <MetamaskIcon />
                <div>
                  <div className="text-[10px] md:text-xs text-black-250 font-medium">Metamask</div>
                  <div className="text-[10px] md:text-xs text-black-350 mt-0.5">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </div>
                </div>
                <div className="md:ml-3">
                  <DropdownIcon />
                </div>
              </ClickAnimation>
            </div>
          )}
        </div>
      </header>
    </Container>
  );
};

export default Header;
