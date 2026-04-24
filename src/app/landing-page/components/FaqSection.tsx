"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: "faq-1",
    q: "How does the MTNInvest investment model work?",
    a: "You purchase shares at ₦8,900 each — minimum 4 shares. Every 1st of the month, you receive 15% of your total investment as a return, credited directly to your MTNInvest wallet. For example, if you invest ₦35,600 (4 shares), you receive ₦5,340 every month.",
  },
  {
    id: "faq-2",
    q: "What is the minimum amount I need to start investing?",
    a: "The minimum investment is 4 shares at ₦8,900 each — a total of ₦35,600. You also need a minimum wallet top-up of ₦10,000 to fund your account before investing. There is no maximum limit on how many shares you can hold.",
  },
  {
    id: "faq-3",
    q: "When do I receive my monthly returns?",
    a: "Returns are credited to your MTNInvest wallet on the 1st of every month. You can withdraw your returns anytime after the 1st, but only once per month. Withdrawals are processed within 24 hours directly to your linked bank account.",
  },
  {
    id: "faq-4",
    q: "Can I get my capital back after investing?",
    a: "No — once you invest, your capital is permanently locked in. This is what enables us to offer consistent monthly returns. Your earnings (15% monthly) continue to be paid out indefinitely as long as your investment is active.",
  },
  {
    id: "faq-5",
    q: "How do I fund my investment account?",
    a: "You link your debit card (Mastercard, Visa, or Verve) to your account — similar to how Netflix or Spotify works. Once linked, you can top up your wallet with a single click and then use your wallet balance to invest. Minimum wallet top-up is ₦10,000.",
  },
  {
    id: "faq-6",
    q: "How do I withdraw my returns?",
    a: "After your returns are credited on the 1st of the month, you can withdraw from your wallet to your linked Nigerian bank account at any time. Minimum withdrawal is ₦5,340 and you can withdraw once per month. Withdrawals are processed within 24 hours.",
  },
  {
    id: "faq-7",
    q: "Is my card and money safe?",
    a: "Yes. Card payments are processed via Paystack, a PCIDSS-compliant payment processor. We never store your full card details. All investor funds are held in segregated accounts at regulated banking partners and are covered by the Nigeria Deposit Insurance Corporation (NDIC) up to ₦5,000,000.",
  },
  {
    id: "faq-8",
    q: "Can I hold multiple investment plans at the same time?",
    a: "Yes! There is no limit on the number of plans you can hold. Many investors start with a Basic plan and add more shares over time to increase their monthly returns. You can invest in any tier — or use the Custom plan to pick exactly how many shares you want.",
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