import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import App from './app';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Base Migrate',
  description: 'Migrate ERC20 tokens to Base Network',
  keywords: [
    'base',
    'migrate',
    'erc20',
    'tokens',
    'migrate ERC20 tokens to base network',
    'base network',
    'base migrate',
    'erc20 token to base network',
    'migrate erc20 tokens',
  ],
  applicationName: 'Base Migrate',
  authors: [{ name: 'Justice Eziefule', url: 'https://github.com/meisterjustice' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App>{children}</App>
      </body>
    </html>
  );
}
