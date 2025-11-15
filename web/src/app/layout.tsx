import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ReWrite - AI-Powered Grammar & Spelling Correction Chrome Extension',
  description:
    'ReWrite is an intelligent Chrome extension that uses AI to automatically fix grammar and spelling errors in your text. Perfect for professionals, students, and anyone who writes online.',
  keywords: [
    'grammar checker',
    'spelling checker',
    'AI writing assistant',
    'Chrome extension',
    'text correction',
    'proofreading tool',
    'writing enhancement',
    'grammar correction',
    'ReWrite',
    'AI grammar',
    'browser extension',
    'writing productivity',
  ],
  authors: [{ name: 'ReWrite Team' }],
  creator: 'ReWrite',
  publisher: 'ReWrite',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rewrite-extension.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ReWrite - AI-Powered Grammar & Spelling Correction',
    description:
      'Transform your writing with AI-powered grammar and spelling correction. Install ReWrite Chrome extension today.',
    url: 'https://rewrite-extension.com',
    siteName: 'ReWrite',
    images: [
      {
        url: '/screenshot.jpg',
        width: 1200,
        height: 630,
        alt: 'ReWrite Chrome Extension Screenshot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReWrite - AI-Powered Grammar & Spelling Correction',
    description:
      'Transform your writing with AI-powered grammar and spelling correction.',
    images: ['/screenshot.jpg'],
    creator: '@rewrite',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon-128.png',
    shortcut: '/icon-34.png',
    apple: '/icon-128.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'technology',
};

const layout = ({ children }: { children: React.ReactNode }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ReWrite',
    applicationCategory: 'BrowserApplication',
    operatingSystem: 'Chrome',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '10000',
    },
    description:
      'AI-powered Chrome extension that fixes grammar and spelling errors in your text.',
    image: 'https://rewrite-extension.com/screenshot.jpg',
    url: 'https://rewrite-extension.com',
  };

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className='antialiased'>{children}</body>
    </html>
  );
};

export default layout;
