"use client"

import React from 'react';
import { ethers } from 'ethers';
import ERC20Abi from './abis/OptimismMintableERC20.json'
import L2StandardBridge from './abis/config/base.json'
function Page() {
  const [remoteToken, setRemoteToken] = React.useState('');
  const [name, setName] = React.useState('');
  const [symbol, setSymbol] = React.useState('');

  const handleDeploy = async () => {
    if (typeof window?.ethereum !== 'undefined') {
      try {
        
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.JsonRpcProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contractFactory = new ethers.ContractFactory(ERC20Abi.abi, ERC20Abi.bytecode, signer);
        const contract = await contractFactory.deploy(L2StandardBridge, remoteToken, name, symbol);
        const receipt = await contract.deploymentTransaction();
        await receipt?.wait();
        const address = contract.getAddress();


        console.log('Contract deployed to:', address);
      } catch (error) {
        console.error('Deployment error:', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Remote Token Address"
        value={remoteToken}
        onChange={(e) => setRemoteToken(e.target.value)}
        className="input w-full max-w-xs mb-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full max-w-xs mb-4"
      />
      <input
        type="text"
        placeholder="Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="input input-bordered w-full max-w-xs mb-4"
      />
      <button className="btn btn-primary" onClick={handleDeploy}>Deploy Contract</button>
    </div>
  );
}

export default Page;
