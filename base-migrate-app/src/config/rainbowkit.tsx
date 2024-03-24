/* eslint-disable turbo/no-undeclared-env-vars */
import '@rainbow-me/rainbowkit/styles.css';

import React, { ReactNode } from 'react';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { baseSepolia, base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BaseIcon } from '../../public/icons';

export type Network = {
  name: string;
  icon: JSX.Element;
  chainId: number;
};

export const supportedNetworks = [
  {
    name: 'Base',
    icon: <BaseIcon />,
    chainId: base.id,
  },
  {
    name: 'Base Sepolia',
    icon: <BaseIcon />,
    chainId: baseSepolia.id,
  },
];

export const wagmiConfig = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_APP_NAME!,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  chains: [baseSepolia, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const RainbowProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowProvider;
