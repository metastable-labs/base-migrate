'use client';
import React, { ReactNode } from 'react';

import RainbowProvider from '@/config/rainbowkit';
import { Header } from '@/components';

const App = ({ children }: { children: ReactNode }) => {
  return (
    <RainbowProvider>
      <Header />
      <section>{children}</section>
    </RainbowProvider>
  );
};

export default App;
