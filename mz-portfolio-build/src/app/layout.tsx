import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mohammed Zidan C — Aspiring Chip Designer',
  description:
    'Portfolio of Mohammed Zidan C, VLSI Engineering Student at SRM IST Chennai. Specializing in RTL Design, Verilog HDL, and Digital Logic.',
  keywords: [
    'Mohammed Zidan C',
    'VLSI',
    'RTL Design',
    'Verilog HDL',
    'Chip Designer',
    'ASIC',
    'Digital Logic',
    'SRM Institute',
    'Portfolio',
  ],
  authors: [{ name: 'Mohammed Zidan C', url: 'https://mohammedzidanc.vercel.app' }],
  creator: 'Mohammed Zidan C',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://mohammedzidanc.vercel.app',
    title: 'Mohammed Zidan C — Aspiring Chip Designer',
    description:
      'VLSI Engineering Student specializing in RTL Design, Verilog HDL, and Digital Logic.',
    siteName: 'Mohammed Zidan C Portfolio',
    images: [
      {
        url: '/me.png',
        width: 800,
        height: 800,
        alt: 'Mohammed Zidan C',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Zidan C — Aspiring Chip Designer',
    description: 'VLSI Engineering Student · RTL Design · Verilog HDL',
    images: ['/me.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://mohammedzidanc.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
