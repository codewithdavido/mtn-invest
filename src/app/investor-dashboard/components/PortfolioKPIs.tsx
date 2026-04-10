import React from 'react';
import { TrendingUp, TrendingDown, Wallet, Clock, Layers, AlertTriangle } from 'lucide-react';

// Bento grid plan: 4 cards → row 1: hero (spans 2 cols) + 2 regular = 4-col grid
// Row 1: Total Portfolio Value (2 cols) | Interest Earned | Active Plans
// Row 2: Next Maturity | Pending Withdrawal (alert state)

const kpis = [
  {
    id: 'kpi-portfolio',
    label: 'Total Portfolio Value',
    value: 'GH₵ 14,160.00',
    sub: '+GH₵ 1,842.30 since inception',
    trend: '+14.9%',
    trendUp: true,
    icon: <Wallet size={22} />,
    span: 'xl:col-span-2',
    accent: false,
    hero: true,
  },
  {
    id: 'kpi-interest',
    label: 'Total Interest Earned',
    value: 'GH₵ 1,842.30',
    sub: 'Across all active plans',
    trend: '+GH₵ 243 this month',
    trendUp: true,
    icon: <TrendingUp size={22} />,
    span: 'xl:col-span-1',
    accent: false,
    hero: false,
  },
  {
    id: 'kpi-plans',
    label: 'Active Investment Plans',
    value: '4 Plans',
    sub: '2 Fixed Deposits · 2 Savings',
    trend: 'All performing on schedule',
    trendUp: true,
    icon: <Layers size={22} />,
    span: 'xl:col-span-1',
    accent: false,
    hero: false,
  },
  {
    id: 'kpi-maturity',
    label: 'Next Maturity Date',
    value: '14 Jun 2026',
    sub: 'Fixed Deposit — 6 Months',
    trend: '68 days remaining',
    trendUp: true,
    icon: <Clock size={22} />,
    span: 'xl:col-span-1',
    accent: false,
    hero: false,
  },
  {
    id: 'kpi-pending',
    label: 'Pending Withdrawal',
    value: 'GH₵ 620.00',
    sub: 'Submitted 5 Apr 2026 · Processing',
    trend: 'Est. 1–2 business days',
    trendUp: false,
    icon: <AlertTriangle size={22} />,
    span: 'xl:col-span-1',
    accent: true,
    hero: false,
  },
];

export default function PortfolioKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis?.map((kpi) => (
        <div
          key={kpi?.id}
          className={`${kpi?.span} bg-white rounded-2xl border p-5 hover:shadow-card-hover transition-all duration-200 ${
            kpi?.accent
              ? 'border-amber-200 bg-amber-50' :'border-gray-100'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi?.accent ? 'bg-amber-100 text-amber-600' : 'bg-mtn-yellow-light text-mtn-yellow-dark'}`}>
              {kpi?.icon}
            </div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
              kpi?.trendUp
                ? 'bg-emerald-50 text-emerald-600' :'bg-amber-50 text-amber-600'
            }`}>
              {kpi?.trendUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {kpi?.trend}
            </span>
          </div>
          <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${kpi?.accent ? 'text-amber-500' : 'text-gray-400'}`}>
            {kpi?.label}
          </p>
          <p className={`font-bold tabular-nums mb-1 ${kpi?.hero ? 'text-3xl' : 'text-2xl'} ${kpi?.accent ? 'text-amber-700' : 'text-gray-900'}`}>
            {kpi?.value}
          </p>
          <p className={`text-xs ${kpi?.accent ? 'text-amber-500' : 'text-gray-400'}`}>{kpi?.sub}</p>
        </div>
      ))}
    </div>
  );
}