'use client';
import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Zap, Star, Crown, Rocket, Sliders } from 'lucide-react';

const products = [
  {
    id: 'tier-basic',
    IconComponent: Zap,
    name: 'Basic',
    tagline: 'Perfect to get started',
    description: 'Start your investment journey with 4 shares and earn a guaranteed monthly return every 1st of the month.',
    shares: 4,
    investment: '₦35,600',
    monthlyReturn: '₦17,800',
    features: [
      '4 shares at ₦8,900 each',
      '₦17,800 credited every month',
      'Withdraw once per month',
      'Minimum deposit: ₦10,000 wallet top-up',
      'NDIC coverage up to ₦5,000,000',
    ],
    highlight: false,
    badge: null,
  },
  {
    id: 'tier-standard',
    IconComponent: Star,
    name: 'Standard',
    tagline: 'Most popular choice',
    description: 'Scale up your earnings with 10 shares and receive a substantial monthly return to your wallet.',
    shares: 10,
    investment: '₦89,000',
    monthlyReturn: '₦44,500',
    features: [
      '10 shares at ₦8,900 each',
      '₦44,500 credited every month',
      'Withdraw once per month',
      'Minimum deposit: ₦10,000 wallet top-up',
      'NDIC coverage up to ₦5,000,000',
    ],
    highlight: true,
    badge: 'Most Popular',
  },
  {
    id: 'tier-premium',
    IconComponent: Crown,
    name: 'Premium',
    tagline: 'For serious investors',
    description: 'Maximize your monthly income with 20 shares and enjoy significant returns every single month.',
    shares: 20,
    investment: '₦178,000',
    monthlyReturn: '₦89,000',
    features: [
      '20 shares at ₦8,900 each',
      '₦89,000 credited every month',
      'Withdraw once per month',
      'Minimum deposit: ₦10,000 wallet top-up',
      'NDIC coverage up to ₦5,000,000',
    ],
    highlight: false,
    badge: null,
  },
  {
    id: 'tier-elite',
    IconComponent: Rocket,
    name: 'Elite',
    tagline: 'Maximum returns',
    description: 'Our highest tier investment — 50 shares delivering the biggest monthly returns straight to your wallet.',
    shares: 50,
    investment: '₦445,000',
    monthlyReturn: '₦222,500',
    features: [
      '50 shares at ₦8,900 each',
      '₦222,500 credited every month',
      'Withdraw once per month',
      'Minimum deposit: ₦10,000 wallet top-up',
      'NDIC coverage up to ₦5,000,000',
    ],
    highlight: false,
    badge: 'Best Returns',
  },
  {
    id: 'tier-custom',
    IconComponent: Sliders,
    name: 'Custom',
    tagline: 'Your plan, your amount',
    description: 'Choose exactly how many shares you want — minimum 4. The more shares you hold, the more you earn every month.',
    shares: 0,
    investment: 'You choose',
    monthlyReturn: '50% of investment',
    features: [
      'Minimum 4 shares (₦35,600)',
      'No maximum limit on shares',
      '50% of your investment monthly',
      'Withdraw once per month',
      'NDIC coverage up to ₦5,000,000',
    ],
    highlight: false,
    badge: 'Flexible',
  },
];

export default function ProductCards() {
  return (
    <section id="products" className="py-24 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-sm font-semibold text-mtn-yellow-dark uppercase tracking-widest mb-3">Investment Plans</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Every plan earns you 50% of your investment as monthly returns — credited to your wallet on the 1st of every month.
          </p>
        </div>

        {/* Key info */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { label: '1 Share', value: '₦8,900' },
            { label: 'Minimum Shares', value: '4 shares' },
            { label: 'Monthly Return', value: '50%' },
            { label: 'Payout Date', value: '1st of month' },
            { label: 'Min. Wallet Top-up', value: '₦10,000' },
          ].map((item, i) => (
            <div key={i} className="text-center bg-white rounded-2xl px-6 py-3 border border-gray-200">
              <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
              <p className="text-sm font-bold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products?.map((p) => (
            <div
              key={p?.id}
              className={`rounded-3xl p-8 border transition-all duration-200 hover:shadow-card-hover relative ${
                p?.highlight
                  ? 'bg-gray-900 border-gray-700 text-white'
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              {/* Badge */}
              {p?.badge && (
                <span className={`absolute top-6 right-6 text-xs font-bold px-3 py-1 rounded-full ${
                  p?.highlight ? 'bg-mtn-yellow text-black' : 'bg-mtn-yellow/20 text-mtn-yellow-dark'
                }`}>
                  {p?.badge}
                </span>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                p?.highlight ? 'bg-mtn-yellow text-black' : 'bg-mtn-yellow/10 text-mtn-yellow-dark'
              }`}>
                <p.IconComponent size={28} />
              </div>

              {/* Name */}
              <h3 className="text-2xl font-bold mb-1">{p?.name}</h3>
              <p className={`text-sm font-semibold mb-3 ${p?.highlight ? 'text-mtn-yellow' : 'text-mtn-yellow-dark'}`}>
                {p?.tagline}
              </p>
              <p className={`text-sm leading-relaxed mb-6 ${p?.highlight ? 'text-gray-300' : 'text-gray-500'}`}>
                {p?.description}
              </p>

              {/* Investment & return */}
              <div className={`rounded-2xl p-4 mb-6 ${p?.highlight ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className={`text-xs mb-1 ${p?.highlight ? 'text-gray-400' : 'text-gray-400'}`}>Investment</p>
                    <p className={`text-base font-bold ${p?.highlight ? 'text-white' : 'text-gray-900'}`}>
                      {p?.investment}
                    </p>
                    {p?.shares > 0 && (
                      <p className={`text-xs mt-0.5 ${p?.highlight ? 'text-gray-400' : 'text-gray-400'}`}>
                        {p?.shares} shares
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={`text-xs mb-1 ${p?.highlight ? 'text-gray-400' : 'text-gray-400'}`}>Monthly return</p>
                    <p className="text-xl font-bold text-emerald-400">{p?.monthlyReturn}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {p?.features?.map((f, i) => (
                  <li key={`feat-${p?.id}-${i}`} className={`flex items-start gap-2.5 text-sm ${
                    p?.highlight ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${
                      p?.highlight ? 'text-mtn-yellow' : 'text-emerald-500'
                    }`} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-150 active:scale-95 ${
                  p?.highlight
                    ? 'bg-mtn-yellow text-black hover:bg-mtn-yellow-dark'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-400 mt-10">
          Capital is permanently locked in once invested. Returns are credited on the 1st of every month to your wallet.
          Minimum withdrawal is ₦17,800 · Once per month.
        </p>
      </div>
    </section>
  );
}