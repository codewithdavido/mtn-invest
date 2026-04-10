'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: 'faq-1',
    q: 'How is MTNInvest regulated?',
    a: 'MTNInvest operates under the supervision of the Bank of Ghana and is a licensed deposit-taking institution. All investor funds are held in segregated accounts at partner banks and are covered by the Ghana Deposit Protection Corporation up to GH₵ 50,000.',
  },
  {
    id: 'faq-2',
    q: 'What is the minimum amount I need to start investing?',
    a: 'You can start a Savings Plan with as little as GH₵ 50. Fixed Deposits require a minimum of GH₵ 500. There is no maximum limit.',
  },
  {
    id: 'faq-3',
    q: 'Can I withdraw my Fixed Deposit before maturity?',
    a: 'Early withdrawals on Fixed Deposits are allowed but subject to a 2% early exit fee on principal. Interest earned up to the exit date is paid in full. Withdrawals on medical or emergency grounds are processed with the fee waived upon documentation.',
  },
  {
    id: 'faq-4',
    q: 'How do I fund my investment account?',
    a: 'All funding is done through your MTN Mobile Money wallet. Simply log into your dashboard, select a plan, enter the amount, and confirm with your MoMo PIN. Funds reflect instantly and interest starts accruing on the same day.',
  },
  {
    id: 'faq-5',
    q: 'When and how is interest paid?',
    a: 'For Fixed Deposits, you can choose to receive interest monthly or at maturity. For Savings Plans, interest accrues daily and is credited to your account monthly. All payouts go directly to your MTN MoMo wallet.',
  },
  {
    id: 'faq-6',
    q: 'Is my money safe if MTN experiences network downtime?',
    a: 'Your funds are held by regulated banking partners and are completely independent of MTN\'s network infrastructure. Even during network outages, your investment balance and accrued interest are unaffected. You can access your account via web browser without requiring mobile data.',
  },
  {
    id: 'faq-7',
    q: 'Can I have multiple investment plans at the same time?',
    a: 'Yes. There is no limit on the number of plans you can hold simultaneously. Many investors maintain a Fixed Deposit for long-term goals alongside a Savings Plan for short-term liquidity.',
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Left */}
          <div className="lg:col-span-1">
            <p className="text-sm font-semibold text-mtn-yellow-dark uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Common Questions</h2>
            <p className="text-gray-500 leading-relaxed">
              Everything you need to know before opening your account. Can&apos;t find your answer?
            </p>
            <a
              href="mailto:support@mtninvest.com"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-gray-900 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-150"
            >
              Contact Support
            </a>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-2 space-y-2">
            {faqs?.map((faq) => {
              const isOpen = openId === faq?.id;
              return (
                <div key={faq?.id} className={`border rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? 'border-mtn-yellow' : 'border-gray-200'}`}>
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-150"
                    onClick={() => setOpenId(isOpen ? null : faq?.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-gray-900 pr-4">{faq?.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-mtn-yellow-dark' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 animate-slide-up">
                      <p className="text-sm text-gray-500 leading-relaxed">{faq?.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}