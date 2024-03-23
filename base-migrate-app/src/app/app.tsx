'use client';
import React, { ReactNode, useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';

import RainbowProvider from '@/config/rainbowkit';
import { Header } from '@/components';

import 'react-toastify/dist/ReactToastify.css';
import { setTokenHeader } from '@/utils/axios';

const App = ({ children }: { children: ReactNode }) => {
  const [cookies] = useCookies(['authtoken']);
  const cookieOptions = {
    path: '/',
    expires: new Date(new Date().getTime() + 8 * 60 * 60 * 1000),
  };

  useEffect(() => {
    if (cookies?.authtoken) {
      setTokenHeader(cookies?.authtoken);
    }
  }, [cookies]);

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
