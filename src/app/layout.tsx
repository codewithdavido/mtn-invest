import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../style/tailwind.css';
import { AuthProvider } from '@/context/AuthContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'MTNInvest — Grow Your Money with Africa\'s Network',
  description: 'MTNInvest helps individual retail investors grow their savings through fixed deposits and savings plans — powered by MTN\'s trusted fintech ecosystem.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fmtninvest1135back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
      </body>
    </html>
  );
}