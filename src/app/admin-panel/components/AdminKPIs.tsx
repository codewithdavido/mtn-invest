import React from 'react';
import { Banknote, Users, ShieldAlert, TrendingUp, ArrowDownUp, AlertTriangle } from 'lucide-react';

// Bento: 6 cards → grid-cols-4 → row 1: hero (2 cols) + 2 regular | row 2: 3 regular
const kpis = [
  {
    id: 'admin-kpi-aum',
    label: 'Total Assets Under Management',
    value: 'GH₵ 1.42B',
    sub: '+GH₵ 48.2M this month',
    trend: '+3.5%',
    trendUp: true,
    icon: <Banknote size={24} />,
    span: 'xl:col-span-2',
    alert: false,
  },
  {
    id: 'admin-kpi-investors',
    label: 'Active Investors',
    value: '247,318',
    sub: '+1,204 new this week',
    trend: '+0.5%',
    trendUp: true,
    icon: <Users size={24} />,
    span: 'xl:col-span-1',
    alert: false,
  },
  {
    id: 'admin-kpi-kyc',
    label: 'Pending KYC Reviews',
    value: '7 Pending',
    sub: 'Oldest: 3 days ago',
    trend: 'Needs attention',
    trendUp: false,
    icon: <ShieldAlert size={24} />,
    span: 'xl:col-span-1',
    alert: true,
  },
  {
    id: 'admin-kpi-interest',
    label: 'Total Interest Paid Out',
    value: 'GH₵ 98.4M',
    sub: 'GH₵ 8.2M paid in March 2026',
    trend: '+11.2% YoY',
    trendUp: true,
    icon: <TrendingUp size={24} />,
    span: 'xl:col-span-1',
    alert: false,
  },
  {
    id: 'admin-kpi-txnvol',
    label: 'Transaction Volume (MTD)',
    value: '14,820 txns',
    sub: 'GH₵ 42.1M total value',
    trend: '+8.3% vs last month',
    trendUp: true,
    icon: <ArrowDownUp size={24} />,
    span: 'xl:col-span-1',
    alert: false,
  },
  {
    id: 'admin-kpi-flagged',
    label: 'Flagged Transactions',
    value: '2 Flagged',
    sub: 'Suspicious activity detected',
    trend: 'Review required',
    trendUp: false,
    icon: <AlertTriangle size={24} />,
    span: 'xl:col-span-1',
    alert: true,
  },
];

export default function AdminKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis?.map((kpi) => (
        <div
          key={kpi?.id}
          className={`${kpi?.span} rounded-2xl border p-5 transition-all duration-200 hover:shadow-card-hover ${
            kpi?.alert ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi?.alert ? 'bg-red-100 text-red-500' : 'bg-mtn-yellow-light text-mtn-yellow-dark'}`}>
              {kpi?.icon}
            </div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${kpi?.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
              {kpi?.trend}
            </span>
          </div>
          <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${kpi?.alert ? 'text-red-400' : 'text-gray-400'}`}>{kpi?.label}</p>
          <p className={`text-2xl font-bold tabular-nums mb-1 ${kpi?.alert ? 'text-red-700' : 'text-gray-900'}`}>{kpi?.value}</p>
          <p className={`text-xs ${kpi?.alert ? 'text-red-400' : 'text-gray-400'}`}>{kpi?.sub}</p>
        </div>
      ))}
    </div>
  );
}