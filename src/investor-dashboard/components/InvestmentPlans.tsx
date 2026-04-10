'use client';
import React, { useState } from 'react';
import { Lock, RefreshCw, ChevronRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';

const plans = [
  {
    id: 'plan-fd-001',
    type: 'Fixed Deposit',
    icon: 'fd',
    term: '12 Months',
    rate: '18.50%',
    principal: 8500,
    currentValue: 8914.75,
    interestEarned: 414.75,
    startDate: '14 Jun 2025',
    maturityDate: '14 Jun 2026',
    daysLeft: 68,
    progress: 81,
    status: 'active' as const,
  },
  {
    id: 'plan-fd-002',
    type: 'Fixed Deposit',
    icon: 'fd',
    term: '6 Months',
    rate: '14.75%',
    principal: 3200,
    currentValue: 3388.40,
    interestEarned: 188.40,
    startDate: '14 Dec 2025',
    maturityDate: '14 Jun 2026',
    daysLeft: 68,
    progress: 55,
    status: 'active' as const,
  },
  {
    id: 'plan-sp-001',
    type: 'Y\'ello Savings',
    icon: 'sp',
    term: 'Flexible',
    rate: '9.50%',
    principal: 1600,
    currentValue: 1840.25,
    interestEarned: 240.25,
    startDate: '1 Jan 2025',
    maturityDate: 'No maturity',
    daysLeft: null,
    progress: null,
    status: 'active' as const,
  },
  {
    id: 'plan-sp-002',
    type: 'Pesewa Susu',
    icon: 'sp',
    term: 'Monthly',
    rate: '11.00%',
    principal: 600,
    currentValue: 620.15,
    interestEarned: 20.15,
    startDate: '1 Mar 2026',
    maturityDate: '1 Mar 2027',
    daysLeft: 328,
    progress: 9,
    status: 'active' as const,
  },
];

export default function InvestmentPlans() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-card transition-all duration-200">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-gray-900">My Plans</h3>
          <p className="text-sm text-gray-400 mt-0.5">4 active investments</p>
        </div>
        <Badge variant="active" label="All Active" />
      </div>

      <div className="space-y-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-xl overflow-hidden transition-all duration-200 cursor-pointer ${expanded === plan.id ? 'border-mtn-yellow' : 'border-gray-100 hover:border-gray-200'}`}
            onClick={() => setExpanded(expanded === plan.id ? null : plan.id)}
          >
            {/* Summary row */}
            <div className="flex items-center gap-3 p-3.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${plan.icon === 'fd' ? 'bg-gray-900 text-mtn-yellow' : 'bg-mtn-yellow-light text-mtn-yellow-dark'}`}>
                {plan.icon === 'fd' ? <Lock size={16} /> : <RefreshCw size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{plan.type}</p>
                <p className="text-xs text-gray-400">{plan.term} · {plan.rate} p.a.</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-gray-900 tabular-nums">GH₵ {plan.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                <p className="text-xs text-emerald-500 tabular-nums">+GH₵ {plan.interestEarned.toFixed(2)}</p>
              </div>
              <ChevronRight size={14} className={`text-gray-300 shrink-0 transition-transform duration-200 ${expanded === plan.id ? 'rotate-90' : ''}`} />
            </div>

            {/* Progress bar */}
            {plan.progress !== null && (
              <div className="px-3.5 pb-2.5">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>{plan.progress}% to maturity</span>
                  {plan.daysLeft && <span>{plan.daysLeft} days left</span>}
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-mtn-yellow rounded-full transition-all duration-500"
                    style={{ width: `${plan.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Expanded detail */}
            {expanded === plan.id && (
              <div className="border-t border-gray-100 px-3.5 py-3 bg-gray-50 animate-slide-up">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Principal', value: `GH₵ ${plan.principal.toLocaleString()}` },
                    { label: 'Interest Earned', value: `GH₵ ${plan.interestEarned.toFixed(2)}` },
                    { label: 'Start Date', value: plan.startDate },
                    { label: 'Maturity Date', value: plan.maturityDate },
                  ].map((item, i) => (
                    <div key={`detail-${plan.id}-${i}`}>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-xs font-semibold text-gray-700 tabular-nums">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}