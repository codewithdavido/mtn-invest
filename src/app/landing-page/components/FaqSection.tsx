"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: "faq-1",
    q: "How is MTNInvest regulated?",
    a: "MTNInvest operates under the supervision of the Central Bank of Nigeria (CBN) and is a licensed deposit-taking institution. All investor funds are held in segregated accounts at partner banks and are covered by the Nigeria Deposit Insurance Corporation (NDIC) up to ₦5,000,000.",
  },
  {
    id: "faq-2",
    q: "What is the minimum amount I need to start investing?",
    a: "You can start a Savings Plan with as little as ₦1,000. Fixed Deposits require a minimum of ₦10,000. There is no maximum limit.",
  },
  {
    id: "faq-3",
    q: "Can I withdraw my Fixed Deposit before maturity?",
    a: "Early withdrawals on Fixed Deposits are allowed but subject to a 2% early exit fee on principal. Interest earned up to the exit date is paid in full.",
  },
  {
    id: "faq-4",
    q: "How do I fund my investment account?",
    a: "We use secure card-on-file technology similar to Netflix or Spotify. Simply link your debit card (Mastercard, Visa, or Verve) to your account. Once linked, you can fund any investment plan instantly with a single click—no need to enter card details ever again.",
  },
  {
    id: "faq-5",
    q: "When and how is interest paid?",
    a: "For Fixed Deposits, you can choose to receive interest monthly or at maturity. For Savings Plans, interest accrues daily and is credited to your account monthly. All payouts are sent directly to your linked bank account or can be reinvested with a single click.",
  },
  {
    id: "faq-6",
    q: "Is my card information safe?",
    a: "Yes. We do not store your full card details on our servers. All payments are processed via PCIDSS-compliant partners (like Paystack or Flutterwave), ensuring your data is protected by the highest global security standards.",
  },
  {
    id: "faq-7",
    q: "Can I have multiple investment plans at the same time?",
    a: "Yes. There is no limit on the number of plans you can hold simultaneously. Many investors maintain a Fixed Deposit for long-term goals alongside a Savings Plan for short-term liquidity.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Left */}
          <div className="lg:col-span-1">
            <p className="text-sm font-semibold text-mtn-yellow-dark uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Common Questions
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Everything you need to know before opening your account.
              Can&apos;t find your answer?
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
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? "border-mtn-yellow ring-1 ring-mtn-yellow/30"
                      : "border-gray-200"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-150"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={!!isOpen}
                  >
                    <span className="text-sm font-semibold text-gray-900 pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-gray-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-mtn-yellow-dark" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 animate-slide-up">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {faq.a}
                      </p>
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
