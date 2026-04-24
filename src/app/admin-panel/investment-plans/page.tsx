'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  Zap,
  Star,
  Crown,
  Rocket,
  Sliders,
  Eye,
  X,
  Mail,
  Phone,
  Calendar,
} from 'lucide-react';

const tierColors: Record<string, string> = {
  Basic:    'bg-blue-50 text-blue-600',
  Standard: 'bg-purple-50 text-purple-600',
  Premium:  'bg-orange-50 text-orange-600',
  Elite:    'bg-red-50 text-red-600',
  Custom:   'bg-gray-100 text-gray-600',
};

const tierIcons: Record<string, React.ElementType> = {
  Basic:    Zap,
  Standard: Star,
  Premium:  Crown,
  Elite:    Rocket,
  Custom:   Sliders,
};

const tierSummary = [
  { tier: 'Basic',    investors: 412, totalShares: 1648,  totalInvested: '₦14,667,200',  monthlyPayout: '₦2,200,080'  },
  { tier: 'Standard', investors: 389, totalShares: 3890,  totalInvested: '₦34,621,000',  monthlyPayout: '₦5,193,150'  },
  { tier: 'Premium',  investors: 201, totalShares: 4020,  totalInvested: '₦35,778,000',  monthlyPayout: '₦5,366,700'  },
  { tier: 'Elite',    investors: 98,  totalShares: 4900,  totalInvested: '₦43,610,000',  monthlyPayout: '₦6,541,500'  },
  { tier: 'Custom',   investors: 147, totalShares: 1323,  totalInvested: '₦11,774,700',  monthlyPayout: '₦1,766,205'  },
];

const activePlans = [
  { id: 'plan-1', investor: 'Chioma Okafor',    email: 'chioma@email.com',  phone: '08012345678', tier: 'Standard', shares: 10, invested: '₦89,000',  monthlyReturn: '₦13,350', startDate: 'Jan 1, 2026',  totalEarned: '₦40,050', status: 'Active' },
  { id: 'plan-2', investor: 'Emeka Nwosu',      email: 'emeka@email.com',   phone: '08023456789', tier: 'Basic',    shares: 4,  invested: '₦35,600',  monthlyReturn: '₦5,340',  startDate: 'Feb 1, 2026',  totalEarned: '₦16,020', status: 'Active' },
  { id: 'plan-3', investor: 'Fatima Abdullahi', email: 'fatima@email.com',  phone: '08034567890', tier: 'Elite',    shares: 50, invested: '₦445,000', monthlyReturn: '₦66,750', startDate: 'Apr 1, 2026',  totalEarned: '₦66,750', status: 'Active' },
  { id: 'plan-4', investor: 'Tunde Adeyemi',    email: 'tunde@email.com',   phone: '08045678901', tier: 'Custom',   shares: 7,  invested: '₦62,300',  monthlyReturn: '₦9,345',  startDate: 'Jan 15, 2026', totalEarned: '₦28,035', status: 'Active' },
  { id: 'plan-5', investor: 'Ngozi Eze',        email: 'ngozi@email.com',   phone: '08056789012', tier: 'Premium',  shares: 20, invested: '₦178,000', monthlyReturn: '₦26,700', startDate: 'Mar 1, 2026',  totalEarned: '₦53,400', status: 'Active' },
  { id: 'plan-6', investor: 'Bola Adesanya',    email: 'bola@email.com',    phone: '08067890123', tier: 'Basic',    shares: 4,  invested: '₦35,600',  monthlyReturn: '₦5,340',  startDate: 'Dec 1, 2025',  totalEarned: '₦26,700', status: 'Active' },
];

export default function InvestmentPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<typeof activePlans[0] | null>(null);
  const [tierFilter, setTierFilter] = useState('All');

  const filtered = tierFilter === 'All'
    ? activePlans
    : activePlans.filter(p => p.tier === tierFilter);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Investment Plans</h2>
        <p className="text-gray-500 mt-1 text-sm">Overview of all active investment plans across all investors</p>
      </div>

      {/* Tier summary cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {tierSummary.map(t => {
          const Icon = tierIcons[t.tier];
          return (
            <div key={t.tier} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tierColors[t.tier]}`}>
                  <Icon size={16} />
                </div>
                <p className="text-sm font-bold text-gray-900">{t.tier}</p>
              </div>
              <p className="text-xl font-bold text-gray-900 mb-1">{t.investors}</p>
              <p className="text-xs text-gray-400 mb-3">investors</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Total Shares</span>
                  <span className="font-semibold text-gray-700">{t.totalShares.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Monthly Payout</span>
                  <span className="font-semibold text-emerald-600">{t.monthlyPayout}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Active Plans',   value: activePlans.length.toString(), color: 'bg-blue-500'    },
          { label: 'Total Shares Held',    value: tierSummary.reduce((s, t) => s + t.totalShares, 0).toLocaleString(), color: 'bg-gray-900' },
          { label: 'Total Invested',       value: '₦140,450,900',                color: 'bg-mtn-yellow'  },
          { label: 'Total Monthly Payout', value: '₦21,067,635',                 color: 'bg-emerald-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
            <div className={`w-3 h-12 rounded-full ${s.color} shrink-0`} />
            <div>
              <p className="text-lg font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Basic', 'Standard', 'Premium', 'Elite', 'Custom'].map(f => (
          <button
            key={f}
            onClick={() => setTierFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-150 ${
              tierFilter === f
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900 hover:text-gray-900'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Plans table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Investor</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Tier</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Shares</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Invested</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Monthly Return</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Total Earned</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Start Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(plan => (
                <tr key={plan.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-mtn-yellow flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-black">{plan.investor.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{plan.investor}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tierColors[plan.tier]}`}>{plan.tier}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{plan.shares}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{plan.invested}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-emerald-600">{plan.monthlyReturn}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{plan.totalEarned}</td>
                  <td className="px-6 py-4 text-xs text-gray-400">{plan.startDate}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedPlan(plan)}
                      aria-label={`View plan for ${plan.investor}`}
                      className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-all duration-150"
                    >
                      <Eye size={13} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan detail modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <p className="text-base font-bold text-gray-900">Plan Details</p>
              <button aria-label="Close" onClick={() => setSelectedPlan(null)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <X size={18} />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-full bg-mtn-yellow flex items-center justify-center">
                  <span className="text-sm font-bold text-black">{selectedPlan.investor.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{selectedPlan.investor}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tierColors[selectedPlan.tier]}`}>{selectedPlan.tier}</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-500"><Mail size={14} />{selectedPlan.email}</div>
                <div className="flex items-center gap-2 text-gray-500"><Phone size={14} />{selectedPlan.phone}</div>
                <div className="flex items-center gap-2 text-gray-500"><Calendar size={14} />Started {selectedPlan.startDate}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Shares',        value: selectedPlan.shares.toString() },
                  { label: 'Invested',      value: selectedPlan.invested          },
                  { label: 'Monthly Return',value: selectedPlan.monthlyReturn     },
                  { label: 'Total Earned',  value: selectedPlan.totalEarned       },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setSelectedPlan(null)} className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-all duration-150">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}