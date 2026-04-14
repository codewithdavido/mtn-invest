'use client';
import React from 'react';
import Link from 'next/link';
import { Lock, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';

const products = [
  {
    id: 'prod-fd',
    IconComponent: Lock,
    type: 'Fixed Deposit',
    tagline: 'Lock in high returns',
    description: 'Commit your funds for a fixed term and earn guaranteed interest. The longer you lock, the higher the rate — up to 18.5% p.a.',
    rates: [
      { term: '3 Months',  rate: '12.50%' },
      { term: '6 Months',  rate: '14.75%' },
      { term: '12 Months', rate: '18.50%' },
    ],
    minAmount: '₦10,000',
    features: [
      'Guaranteed fixed interest rate',
      'Auto-renewal option at maturity',
      'Early exit with penalty waiver on medical grounds',
      'Interest paid at maturity or monthly',
      'NDIC coverage up to ₦5,000,000',
    ],
    cta: 'Open Fixed Deposit',
    highlight: true,
  },
  {
    id: 'prod-savings',
    IconComponent: RefreshCw,
    type: 'Savings Plan',
    tagline: 'Save at your own pace',
    description: 'Set up automated daily, weekly, or monthly contributions. Access your funds anytime with competitive interest on every naira saved.',
    rates: [
      { term: "Y'ello Savings",  rate: '9.50%' },
      { term: 'Naira Thrift',    rate: '11.00%' },
      { term: 'Goal Saver',      rate: '10.25%' },
    ],
    minAmount: '₦1,000',
    features: [
      'Flexible contribution frequency',
      'Instant withdrawal, no lock-in period',
      'Automated savings via MTN MoMo',
      'Goal-based savings tracking',
      'No account maintenance fees',
    ],
    cta: 'Start Saving',
    highlight: false,
  },
];

export default function ProductCards() {
  return (
    <section id="products" className="py-24 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-mtn-yellow-dark uppercase tracking-widest mb-3">Our Products</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Two Ways to Grow Your Money</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Whether you prefer locked-in certainty or flexible access, MTNInvest has a product built for your financial goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {products?.map((p) => (
            <div
              key={p?.id}
              className={`rounded-3xl p-8 border transition-all duration-200 hover:shadow-card-hover ${
                p?.highlight
                  ? 'bg-gray-900 border-gray-700 text-white'
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${p?.highlight ? 'bg-mtn-yellow text-black' : 'bg-mtn-yellow-light text-mtn-yellow-dark'}`}>
                  <p.IconComponent size={32} />
                </div>
                {p?.highlight && (
                  <span className="bg-mtn-yellow text-black text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
                )}
              </div>

              <h3 className="text-2xl font-bold mb-1">{p?.type}</h3>
              <p className={`text-sm font-semibold mb-3 ${p?.highlight ? 'text-mtn-yellow' : 'text-mtn-yellow-dark'}`}>{p?.tagline}</p>
              <p className={`text-sm leading-relaxed mb-6 ${p?.highlight ? 'text-gray-300' : 'text-gray-500'}`}>{p?.description}</p>

              {/* Rates */}
              <div className={`rounded-2xl p-4 mb-6 ${p?.highlight ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-gray-400">Interest Rates</p>
                <div className="space-y-2">
                  {p?.rates?.map((r, i) => (
                    <div key={`rate-${p?.id}-${i}`} className="flex items-center justify-between">
                      <span className={`text-sm ${p?.highlight ? 'text-gray-300' : 'text-gray-600'}`}>{r?.term}</span>
                      <span className={`text-sm font-bold tabular-nums ${p?.highlight ? 'text-mtn-yellow' : 'text-gray-900'}`}>{r?.rate} p.a.</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Min amount */}
              <div className={`flex items-center gap-2 text-sm mb-5 ${p?.highlight ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="font-medium">Minimum investment:</span>
                <span className={`font-bold ${p?.highlight ? 'text-white' : 'text-gray-900'}`}>{p?.minAmount}</span>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {p?.features?.map((f, i) => (
                  <li key={`feat-${p?.id}-${i}`} className={`flex items-start gap-2.5 text-sm ${p?.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                    <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${p?.highlight ? 'text-mtn-yellow' : 'text-emerald-500'}`} />
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
                {p?.cta}
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}