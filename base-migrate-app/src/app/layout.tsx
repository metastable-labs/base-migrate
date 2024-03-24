import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import type { Viewport } from 'next';

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
  openGraph: {
    title: 'Base Migrate',
    description: 'Migrate ERC20 tokens to Base Network',
    url: 'https://base-migrate.xyz',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/djzeufu4j/image/upload/v1711129042/base_migrate_ufm9de.png',
        width: 1200,
        height: 630,
      },
    ],
    siteName: 'base-migrate.xyz',
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://base-migrate.xyz',
    title: 'Base Migrate',
    description: 'Migrate ERC20 tokens to Base Network',
    images: [
      {
        url: 'https://res.cloudinary.com/djzeufu4j/image/upload/v1711129042/base_migrate_ufm9de.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#F1F2F6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/** Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KP3SGTMZQD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-KP3SGTMZQD');
        `}
        </Script>

        <App>{children}</App>
      </body>
    </html>
  );
}
