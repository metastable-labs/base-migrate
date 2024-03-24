'use client';

import React from 'react';
import { useCookies } from 'react-cookie';
import { useAccount } from 'wagmi';
import useConnect from '@/hooks/useConnect';

import { Button } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';

function Page() {
  const { isConnected, address } = useAccount();
  const { connectModal } = useConnect();
  const { navigate } = useSystemFunctions();
  const [cookies] = useCookies(['authtoken']);

  const authToken = cookies?.authtoken;

  const handleConnect = () => {
    if (!isConnected && !address) {
      return connectModal();
    }

    return navigate.push(authToken ? '/migrate' : '/home');
  };

  return (
    <div className="min-h-[89vh] flex flex-col justify-between items-center pt-20 relative bg-white-100">
      <div className="flex flex-col items-center w-full z-20">
        <h1 className="font-medium text-3xl md:text-5xl xl:text-6xl text-center leading-10 md:max-w-[65%] xl:max-w-[45%] 2xl:max-w-[30%] md:leading-[73px] xl:leading-[87px]">
          Migrate ERC20 tokens to Base Network
        </h1>
        <p className="text-black-150 text-sm lg:text-base pt-5 pb-7 text-center leading-5 md:max-w-[60%] xl:max-w-[32%] 2xl:max-w-[22%] md:leading-[28px]">
          Automatically deploy canonical bridged ERC20 to base and Create a PR on the superchain
          token list repo.
        </p>
        <Button onClick={handleConnect} text="Migrate to base" />
      </div>

      <div className="absolute bottom-0 asset z-10" />
    </div>
  );
}

export default Page;
