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

  themeColor: '#F1F2F6',
  openGraph: {
    title: 'Base Migrate',
    description: 'Migrate ERC20 tokens to Base Network',
    url: 'https://base.xyz',
    type: 'website',
    images: [
      {
        url: 'https://asset.cloudinary.com/djzeufu4j/f9b441c38bf88c6d0671323af1bb45be',
        width: 1200,
        height: 630,
      },
    ],
    siteName: 'base.xyz',
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://base.xyz',
    title: 'Base Migrate',
    description: 'Migrate ERC20 tokens to Base Network',
    images: [
      {
        url: 'https://asset.cloudinary.com/djzeufu4j/f9b441c38bf88c6d0671323af1bb45be',
        width: 1200,
        height: 630,
      },
    ],
  },
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
