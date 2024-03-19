import React from 'react';
import { Button } from '@/components';
import { ConnectIcon } from '../../../public/icons';
import useConnect from '@/hooks/useConnect';

const ConnectWallet = () => {
  const { connectModal } = useConnect();
  return (
    <div className="w-[80%] md:w-[376px] p-6 rounded-xl border border-black-200 flex flex-col justify-center items-center gap-6">
      <ConnectIcon />
      <div className="font-medium text-sm md:text-base text-black-250">
        Connect wallet to continue
      </div>
      <p className="text-black-300 text-sm md:text-base leading-5 lg:leading-7 text-center">
        The connected wallet will be used to deploy the token contract. Make sure you’re connecting
        the deployer wallet.
      </p>
      <Button variant="secondary" onClick={connectModal} text="Connect wallet" />
    </div>
  );
};

export default ConnectWallet;
