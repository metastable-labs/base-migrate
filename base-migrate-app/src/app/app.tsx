'use client';
import React, { ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';

import RainbowProvider from '@/config/rainbowkit';
import { Header } from '@/components';

import 'react-toastify/dist/ReactToastify.css';

const App = ({ children }: { children: ReactNode }) => {
  const cookieOptions = {
    path: '/',
    expires: new Date(new Date().getTime() + 8 * 60 * 60 * 1000),
  };

  return (
    <CookiesProvider defaultSetOptions={cookieOptions}>
      <RainbowProvider>
        <Header />
        <section>
          {children}
          <ToastContainer position="top-center" theme="colored" />
        </section>
      </RainbowProvider>
    </CookiesProvider>
  );
};

export default App;
