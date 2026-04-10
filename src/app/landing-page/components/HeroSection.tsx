'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, TrendingUp, Smartphone } from 'lucide-react';
import type { FC, SVGProps } from 'react';

type IconComponent = FC<SVGProps<SVGSVGElement> & { size?: number | string }>;

interface TrustBullet {
  IconComponent: IconComponent;
  text: string;
}

const trustBullets: TrustBullet[] = [
  { IconComponent: ShieldCheck as IconComponent, text: 'Bank-grade security' },
  { IconComponent: TrendingUp as IconComponent,  text: 'Up to 18.5% p.a.' },
  { IconComponent: Smartphone as IconComponent,  text: 'Via MTN MoMo' },
];

const rates = [
  { plan: 'Fixed Deposit — 3 Months',  rate: '12.50%', min: 'GH₵ 500',   badge: 'Popular' },
  { plan: 'Fixed Deposit — 6 Months',  rate: '14.75%', min: 'GH₵ 500',   badge: null },
  { plan: 'Fixed Deposit — 12 Months', rate: '18.50%', min: 'GH₵ 1,000', badge: 'Best Rate' },
  { plan: 'Y\'ello Savings Plan',       rate: '9.50%',  min: 'GH₵ 50',    badge: 'Flexible' },
  { plan: 'Pesewa Susu Monthly',        rate: '11.00%', min: 'GH₵ 100',   badge: null },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center overflow-hidden pt-16">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-mtn-yellow rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-mtn-yellow rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mtn-yellow rounded-full blur-3xl opacity-5" />
      </div>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,204,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,204,0,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />
      <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-mtn-yellow/10 border border-mtn-yellow/30 text-mtn-yellow rounded-full px-4 py-1.5 text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-mtn-yellow rounded-full animate-pulse" />
            Now offering up to 18.5% p.a. on Fixed Deposits
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Grow Your Money
            <span className="block text-mtn-yellow">Everywhere You Go</span>
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
            MTNInvest brings you high-yield fixed deposits and flexible savings plans — built on Africa&apos;s most trusted mobile network. Start with as little as GH₵ 50.
          </p>

          {/* Trust bullets */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {trustBullets?.map((item, i) => (
              <div key={`trust-${i}`} className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-mtn-yellow"><item.IconComponent size={16} /></span>
                {item?.text}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/investor-dashboard"
              className="inline-flex items-center justify-center gap-2 bg-mtn-yellow text-black font-bold px-8 py-4 rounded-2xl hover:bg-mtn-yellow-dark transition-all duration-150 active:scale-95 text-base shadow-lg shadow-mtn-yellow/20"
            >
              Open an Account
              <ArrowRight size={18} />
            </Link>
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all duration-150 text-base"
            >
              View Products
            </a>
          </div>
        </div>

        {/* Right — rate card */}
        <div className="hidden lg:block">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Current Rates — April 2026</p>
            <div className="space-y-4">
              {rates?.map((r, i) => (
                <div key={`rate-${i}`} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-white">{r?.plan}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Min. {r?.min}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-mtn-yellow tabular-nums">{r?.rate}</p>
                    {r?.badge && (
                      <span className="text-xs bg-mtn-yellow/20 text-mtn-yellow px-2 py-0.5 rounded-full font-semibold">{r?.badge}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">Rates effective 1 April 2026. Subject to change. T&Cs apply.</p>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center pt-2">
          <div className="w-1.5 h-2.5 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}