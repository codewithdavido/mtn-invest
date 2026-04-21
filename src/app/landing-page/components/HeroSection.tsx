'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, TrendingUp, CreditCard } from 'lucide-react';
import type { FC, SVGProps } from 'react';

type IconComponent = FC<SVGProps<SVGSVGElement> & { size?: number | string }>;

interface TrustBullet {
  IconComponent: IconComponent;
  text: string;
}

const trustBullets: TrustBullet[] = [
  { IconComponent: ShieldCheck as IconComponent, text: 'PCIDSS Secure' },
  { IconComponent: TrendingUp as IconComponent,  text: '50% Monthly Returns' },
  { IconComponent: CreditCard as IconComponent,  text: 'Link Any Debit Card' },
];

const plans = [
  { plan: 'Basic Plan',    shares: 4,  investment: '₦35,600',  monthly: '₦17,800',  badge: 'Starter'     },
  { plan: 'Standard Plan', shares: 10, investment: '₦89,000',  monthly: '₦44,500',  badge: 'Popular'     },
  { plan: 'Premium Plan',  shares: 20, investment: '₦178,000', monthly: '₦89,000',  badge: null          },
  { plan: 'Elite Plan',    shares: 50, investment: '₦445,000', monthly: '₦222,500', badge: 'Best Returns' },
  { plan: 'Custom Plan',   shares: 0,  investment: 'Your choice', monthly: '50% of investment', badge: 'Flexible' },
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
            Earn 50% of your investment every month
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Grow Your Money
            <span className="block text-mtn-yellow">Every Single Month</span>
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
            MTNInvest gives you 50% of your investment as monthly returns — every 1st of the month, directly to your wallet.
            Link your card once and start earning. As little as ₦35,600 to get started.
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
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-mtn-yellow text-black font-bold px-8 py-4 rounded-2xl hover:bg-mtn-yellow-dark transition-all duration-150 active:scale-95 text-base shadow-lg shadow-mtn-yellow/20"
            >
              Start Earning Now
              <ArrowRight size={18} />
            </Link>
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all duration-150 text-base"
            >
              View Plans
            </a>
          </div>
        </div>

        {/* Right — plans card */}
        <div className="hidden lg:block">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Investment Plans</p>
            <p className="text-xs text-gray-500 mb-6">1 share = ₦8,900 · Min. 4 shares · Returns paid monthly</p>
            <div className="space-y-3">
              {plans?.map((p, i) => (
                <div key={`plan-${i}`} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white">{p?.plan}</p>
                      {p?.badge && (
                        <span className="text-xs bg-mtn-yellow/20 text-mtn-yellow px-2 py-0.5 rounded-full font-semibold">{p?.badge}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {p?.shares > 0 ? `${p?.shares} shares · ${p?.investment}` : 'Choose your own shares'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-emerald-400 tabular-nums">{p?.monthly}</p>
                    <p className="text-xs text-gray-500">per month</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">Returns credited every 1st of the month. Capital is permanently locked in.</p>
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