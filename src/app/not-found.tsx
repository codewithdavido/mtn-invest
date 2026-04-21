'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          style={{
            backgroundImage: 'linear-gradient(rgba(255,204,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,204,0,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mtn-yellow rounded-full blur-3xl opacity-5" />

      <div className="relative text-center max-w-lg">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-12">
          <AppLogo size={36} />
          <span className="font-bold text-xl text-white tracking-tight">MTNInvest</span>
        </div>

        {/* 404 */}
        <h1 className="text-8xl lg:text-9xl font-black text-mtn-yellow tabular-nums mb-4">
          404
        </h1>

        <h2 className="text-2xl font-bold text-white mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-mtn-yellow text-black font-bold px-8 py-3.5 rounded-2xl hover:bg-mtn-yellow-dark transition-all duration-150 active:scale-95 text-sm"
          >
            <Home size={16} />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-2xl hover:bg-white/10 transition-all duration-150 text-sm"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-gray-500 mb-4">Quick Links</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Sign In',   href: '/signin'             },
              { label: 'Sign Up',   href: '/signup'             },
              { label: 'Dashboard', href: '/investor-dashboard' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-gray-400 hover:text-mtn-yellow transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}