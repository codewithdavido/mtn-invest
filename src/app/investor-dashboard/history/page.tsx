'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  CircleDollarSign,
  Wallet,
  BarChart3,
  History,
  Calendar,
} from 'lucide-react';

// --- Types ---
type TabId = 'active' | 'transactions' | 'returns';
type TransactionType = 'All' | 'Deposit' | 'Withdrawal' | 'Return' | 'Investment';

// --- Data ---
const summaryCards = [
  {
    id: 'sc-invested',
    label: 'Total Invested',
    value: '₦71,200',
    sub: '8 shares',
    icon: TrendingUp,
    color: 'bg-gray-900',
    iconColor: 'text-mtn-yellow',
  },
  {
    id: 'sc-returns',
    label: 'Total Returns Earned',
    value: '₦53,400',
    sub: 'All time',
    icon: CircleDollarSign,
    color: 'bg-emerald-500',
    iconColor: 'text-white',
  },
  {
    id: 'sc-withdrawn',
    label: 'Total Withdrawn',
    value: '₦35,600',
    sub: 'All time',
    icon: Wallet,
    color: 'bg-blue-500',
    iconColor: 'text-white',
  },
  {
    id: 'sc-active',
    label: 'Active Plans',
    value: '2',
    sub: 'Currently running',
    icon: BarChart3,
    color: 'bg-mtn-yellow',
    iconColor: 'text-black',
  },
];

const activePlans = [
  {
    id: 'plan-1',
    name: 'Basic Plan',
    shares: 4,
    invested: '₦35,600',
    monthlyReturn: '₦17,800',
    startDate: 'Jan 1, 2026',
    totalEarned: '₦35,600',
    status: 'Active',
  },
  {
    id: 'plan-2',
    name: 'Standard Plan',
    shares: 4,
    invested: '₦35,600',
    monthlyReturn: '₦17,800',
    startDate: 'Feb 1, 2026',
    totalEarned: '₦17,800',
    status: 'Active',
  },
];

const transactions = [
  { id: 'tx-1', type: 'Return',     description: 'Monthly return — Basic Plan',    amount: '+₦17,800', date: 'Apr 1, 2026',  status: 'Success',   positive: true  },
  { id: 'tx-2', type: 'Withdrawal', description: 'Withdrawal to GTBank',           amount: '-₦17,800', date: 'Mar 28, 2026', status: 'Processed', positive: false },
  { id: 'tx-3', type: 'Return',     description: 'Monthly return — Standard Plan', amount: '+₦17,800', date: 'Mar 1, 2026',  status: 'Success',   positive: true  },
  { id: 'tx-4', type: 'Return',     description: 'Monthly return — Basic Plan',    amount: '+₦17,800', date: 'Mar 1, 2026',  status: 'Success',   positive: true  },
  { id: 'tx-5', type: 'Withdrawal', description: 'Withdrawal to GTBank',           amount: '-₦17,800', date: 'Feb 25, 2026', status: 'Processed', positive: false },
  { id: 'tx-6', type: 'Investment', description: 'Standard Plan — 4 shares',       amount: '-₦35,600', date: 'Feb 1, 2026',  status: 'Success',   positive: false },
  { id: 'tx-7', type: 'Deposit',    description: 'Card deposit',                   amount: '+₦50,000', date: 'Feb 10, 2026', status: 'Success',   positive: true  },
  { id: 'tx-8', type: 'Return',     description: 'Monthly return — Basic Plan',    amount: '+₦17,800', date: 'Feb 1, 2026',  status: 'Success',   positive: true  },
  { id: 'tx-9', type: 'Investment', description: 'Basic Plan — 4 shares',          amount: '-₦35,600', date: 'Jan 1, 2026',  status: 'Success',   positive: false },
  { id: 'tx-10', type: 'Deposit',   description: 'Card deposit',                   amount: '+₦50,000', date: 'Jan 1, 2026',  status: 'Success',   positive: true  },
];

const monthlyReturns = [
  { id: 'mr-1', month: 'April 2026',    amount: '₦35,600', plans: 2, date: 'Apr 1, 2026',  status: 'Credited' },
  { id: 'mr-2', month: 'March 2026',    amount: '₦35,600', plans: 2, date: 'Mar 1, 2026',  status: 'Credited' },
  { id: 'mr-3', month: 'February 2026', amount: '₦17,800', plans: 1, date: 'Feb 1, 2026',  status: 'Credited' },
  { id: 'mr-4', month: 'May 2026',      amount: '₦35,600', plans: 2, date: 'May 1, 2026',  status: 'Upcoming' },
];

const tabs = [
  { id: 'active' as TabId,       label: 'Active Investments', icon: TrendingUp    },
  { id: 'transactions' as TabId, label: 'Transactions',       icon: History       },
  { id: 'returns' as TabId,      label: 'Monthly Returns',    icon: Calendar      },
];

const txFilters: TransactionType[] = ['All', 'Deposit', 'Withdrawal', 'Return', 'Investment'];

function getTxIcon(type: string, positive: boolean) {
  if (type === 'Return')     return <CircleDollarSign size={16} className="text-emerald-500" />;
  if (type === 'Deposit')    return <ArrowDownLeft size={16} className="text-emerald-500" />;
  if (type === 'Withdrawal') return <ArrowUpRight size={16} className="text-red-400" />;
  if (type === 'Investment') return <TrendingUp size={16} className="text-blue-500" />;
  return positive
    ? <ArrowDownLeft size={16} className="text-emerald-500" />
    : <ArrowUpRight size={16} className="text-red-400" />;
}

function getTxBg(type: string) {
  if (type === 'Return')     return 'bg-emerald-50';
  if (type === 'Deposit')    return 'bg-emerald-50';
  if (type === 'Withdrawal') return 'bg-red-50';
  if (type === 'Investment') return 'bg-blue-50';
  return 'bg-gray-50';
}

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<TabId>('active');
  const [txFilter, setTxFilter] = useState<TransactionType>('All');

  const filteredTx = txFilter === 'All'
    ? transactions
    : transactions.filter(tx => tx.type === txFilter);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Investment History</h2>
        <p className="text-gray-500 mt-1 text-sm">Track all your investments, transactions and returns</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryCards.map(card => (
          <div key={card.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
              <card.icon size={20} className={card.iconColor} />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
            <p className="text-sm font-medium text-gray-500">{card.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}

      {/* Active Investments */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activePlans.map(plan => (
            <div key={plan.id} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-lg font-bold text-gray-900">{plan.name}</p>
                  <p className="text-sm text-gray-400 mt-0.5">{plan.shares} shares · Started {plan.startDate}</p>
                </div>
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full">
                  {plan.status}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1.5">Amount Invested</p>
                  <p className="text-base font-bold text-gray-900">{plan.invested}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1.5">Monthly Return</p>
                  <p className="text-base font-bold text-emerald-600">{plan.monthlyReturn}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1.5">Total Earned</p>
                  <p className="text-base font-bold text-gray-900">{plan.totalEarned}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1.5">Capital Lock-in</p>
                  <p className="text-base font-bold text-orange-500">Permanent</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Transactions */}
      {activeTab === 'transactions' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {txFilters.map(filter => (
              <button
                key={filter}
                onClick={() => setTxFilter(filter)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-150 ${
                  txFilter === filter
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900 hover:text-gray-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Transaction list */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-50">
              {filteredTx.map(tx => (
                <div key={tx.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getTxBg(tx.type)}`}>
                      {getTxIcon(tx.type, tx.positive)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{tx.description}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-gray-400">{tx.date}</p>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span className="text-xs font-medium text-gray-400">{tx.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold tabular-nums ${tx.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                      {tx.amount}
                    </p>
                    <span className={`text-xs font-semibold ${
                      tx.status === 'Success' || tx.status === 'Processed'
                        ? 'text-emerald-500'
                        : 'text-orange-500'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Monthly Returns */}
      {activeTab === 'returns' && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-50">
            {monthlyReturns.map(mr => (
              <div key={mr.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <CircleDollarSign size={18} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{mr.month}</p>
                    <p className="text-xs text-gray-400">{mr.plans} active plan{mr.plans > 1 ? 's' : ''} · {mr.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-600 tabular-nums">{mr.amount}</p>
                  <span className={`text-xs font-semibold ${
                    mr.status === 'Credited' ? 'text-emerald-500' : 'text-blue-500'
                  }`}>
                    {mr.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}