'use client';
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 'test-1',
    name: 'Chioma Okafor',
    role: 'Small Business Owner, Lagos',
    avatar: 'CO',
    rating: 5,
    text: 'I started with the Y\'ello Savings Plan at ₦5,000/month. Within a year I had saved enough for my shop renovation — and the interest was a bonus I didn\'t expect. MTNInvest made saving automatic and effortless.',
  },
  {
    id: 'test-2',
    name: 'Emeka Nwosu',
    role: 'Teacher, Enugu',
    avatar: 'EN',
    rating: 5,
    text: 'The 12-month Fixed Deposit at 18.5% is unbeatable. I moved my emergency fund here from a regular savings account and the difference in returns after one year was over ₦180,000. The dashboard makes it easy to track everything.',
  },
  {
    id: 'test-3',
    name: 'Fatima Abdullahi',
    role: 'Nurse, Kaduna',
    avatar: 'FA',
    rating: 5,
    text: 'I love that I can invest through my MoMo wallet without needing a bank account. The Naira Thrift plan deducts automatically on payday. No temptation to spend it. My first maturity payout was a great feeling.',
  },
  {
    id: 'test-4',
    name: 'Tunde Adeyemi',
    role: 'Freelance Designer, Abuja',
    avatar: 'TA',
    rating: 4,
    text: 'The investment dashboard is clean and shows me exactly how much interest I\'ve earned each day. I switched from a competitor and the rates here are noticeably better. Customer support was also responsive when I had a question.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-mtn-yellow-dark uppercase tracking-widest mb-3">Investor Stories</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Real People, Real Returns</h2>
          <p className="text-lg text-gray-500">Over 247,000 Nigerians are growing their wealth with MTNInvest.</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {testimonials?.map((t) => (
            <div key={t?.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-card-hover transition-all duration-200">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 })?.map((_, i) => (
                  <Star
                    key={`star-${t?.id}-${i}`}
                    size={14}
                    className={i < t?.rating ? 'text-mtn-yellow fill-mtn-yellow' : 'text-gray-200 fill-gray-200'}
                  />
                ))}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-5">&ldquo;{t?.text}&rdquo;</p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 bg-mtn-yellow rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-black">{t?.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t?.name}</p>
                  <p className="text-xs text-gray-400">{t?.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}