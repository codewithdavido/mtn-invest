'use client';
import React from 'react';
import Link from 'next/link';
import { UserPlus, CreditCard, TrendingUp, Banknote } from 'lucide-react';
import type { FC, SVGProps } from 'react';

type IconComponent = FC<SVGProps<SVGSVGElement> & { size?: number | string }>;

interface Step {
  id: string;
  number: string;
  IconComponent: IconComponent;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 'step-1',
    number: '01',
    IconComponent: UserPlus as IconComponent,
    title: 'Create Your Account',
    description: 'Sign up in minutes. We use your NIN for secure identity verification, keeping your investment account safe and compliant.',
  },
  {
    id: 'step-2',
    number: '02',
    IconComponent: ShieldCheck as IconComponent, // Changed icon to Shield
    title: 'Link Your Card',
    description: 'Connect your Mastercard, Visa, or Verve card once. We use bank-grade encryption to ensure your details are never stored on our servers.',
  },
  {
    id: 'step-3',
    number: '03',
    IconComponent: CreditCard as IconComponent,
    title: 'Choose & Fund',
    description: 'Pick an investment plan and fund it with a single click. No need to re-enter card details for future investments.',
  },
  {
    id: 'step-4',
    number: '04',
    IconComponent: TrendingUp as IconComponent,
    title: 'Grow & Withdraw',
    description: 'Monitor your daily earnings on your dashboard. At maturity, withdraw directly to your bank account or reinvest to compound your gains.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-mtn-yellow-dark uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Start Investing in 4 Simple Steps</h2>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">
            No branch visits. No complex paperwork. Everything happens on your phone through MTN&apos;s trusted network.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps?.map((step, i) => (
            <div key={step?.id} className="relative">
              {i < steps?.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%-1rem)] w-8 h-0.5 bg-mtn-yellow/30 z-10" />
              )}
              <div className="bg-gray-50 rounded-2xl p-6 h-full hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 bg-mtn-yellow rounded-2xl flex items-center justify-center text-black">
                    <step.IconComponent size={28} />
                  </div>
                  <span className="text-4xl font-black text-gray-100 tabular-nums">{step?.number}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step?.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step?.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-mtn-yellow text-black font-bold px-10 py-4 rounded-2xl hover:bg-mtn-yellow-dark transition-all duration-150 active:scale-95 text-base shadow-lg shadow-mtn-yellow/20"
          >
            Open Your Account Now
          </Link>
          <p className="text-sm text-gray-400 mt-3">No minimum commitment. Cancel anytime on Savings Plans.</p>
        </div>
      </div>
    </section>
  );
}