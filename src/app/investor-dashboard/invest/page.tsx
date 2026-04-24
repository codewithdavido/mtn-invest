'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  BarChart3,
  ChevronRight,
  CircleDollarSign,
} from 'lucide-react';

const summaryCards = [
  {
    id: 'card-balance',
    label: 'Wallet Balance',
    value: '₦45,000.00',
    sub: 'Available to invest',
    icon: Wallet,
    color: 'bg-mtn-yellow',
    iconColor: 'text-black',
  },
  {
    id: 'card-invested',
    label: 'Total Invested',
    value: '₦71,200.00',
    sub: '8 shares across 2 plans',
    icon: TrendingUp,
    color: 'bg-gray-900',
    iconColor: 'text-mtn-yellow',
  },
  {
    id: 'card-returns',
    label: 'Total Returns Earned',
    value: '₦53,400.00',
    sub: 'Since you joined',
    icon: CircleDollarSign,
    color: 'bg-emerald-500',
    iconColor: 'text-white',
  },
  {
    id: 'card-next',
    label: 'Next Payout',
    value: 'May 1, 2026',
    sub: '₦35,600 expected',
    icon: Clock,
    color: 'bg-blue-500',
    iconColor: 'text-white',
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

const recentTransactions = [
  { id: 'tx-1', type: 'Return',   description: 'Monthly return — Basic Plan',    amount: '+₦17,800', date: 'Apr 1, 2026',  status: 'Success', positive: true },
  { id: 'tx-2', type: 'Withdraw', description: 'Withdrawal to GTBank',           amount: '-₦17,800', date: 'Mar 28, 2026', status: 'Success', positive: false },
  { id: 'tx-3', type: 'Return',   description: 'Monthly return — Standard Plan', amount: '+₦17,800', date: 'Mar 1, 2026',  status: 'Success', positive: true },
  { id: 'tx-4', type: 'Deposit',  description: 'Card deposit',                   amount: '+₦50,000', date: 'Feb 10, 2026', status: 'Success', positive: true },
  { id: 'tx-5', type: 'Invest',   description: 'Standard Plan — 4 shares',       amount: '-₦35,600', date: 'Feb 1, 2026',  status: 'Success', positive: false },
];

const quickActions = [
  { id: 'qa-invest',   label: 'Invest',   icon: TrendingUp,    href: '/investor-dashboard/invest',   style: 'bg-mtn-yellow text-black hover:bg-mtn-yellow-dark' },
  { id: 'qa-deposit',  label: 'Deposit',  icon: ArrowUpRight,  href: '/investor-dashboard/deposit',  style: 'bg-gray-900 text-white hover:bg-gray-800' },
  { id: 'qa-withdraw', label: 'Withdraw', icon: ArrowDownLeft, href: '/investor-dashboard/withdraw', style: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50' },
];

function getHour() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardHome() {
  return (
    <div className="space-y-6">

      {/* Welcome banner */}
      <div className="bg-gray-900 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-mtn-yellow text-sm font-semibold mb-1">
            {getHour()}, Chioma 👋
          </p>
          <h2 className="text-xl font-bold text-white">
            Your portfolio is up ₦17,800 this month
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {new Date().toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link
          href="/investor-dashboard/invest"
          className="shrink-0 inline-flex items-center gap-2 bg-mtn-yellow text-black font-bold px-5 py-2.5 rounded-xl hover:bg-mtn-yellow-dark transition-all duration-150 active:scale-95 text-sm"
        >
          <TrendingUp size={16} />
          Invest More
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <div key={card.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center`}>
                <card.icon size={20} className={card.iconColor} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
            <p className="text-sm font-medium text-gray-500">{card.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 active:scale-95 ${action.style}`}
          >
            <action.icon size={16} />
            {action.label}
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Active investment plans */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-mtn-yellow-dark" />
              <h3 className="text-sm font-bold text-gray-900">Active Plans</h3>
            </div>
            <Link
              href="/investor-dashboard/history"
              className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1"
            >
              View all <ChevronRight size={12} />
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {activePlans.map((plan) => (
              <div key={plan.id} className="px-6 py-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{plan.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{plan.shares} shares · Started {plan.startDate}</p>
                  </div>
                  <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
                    {plan.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Invested</p>
                    <p className="text-sm font-bold text-gray-900">{plan.invested}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Monthly</p>
                    <p className="text-sm font-bold text-emerald-600">{plan.monthlyReturn}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Earned</p>
                    <p className="text-sm font-bold text-gray-900">{plan.totalEarned}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent transactions */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-mtn-yellow-dark" />
              <h3 className="text-sm font-bold text-gray-900">Recent Transactions</h3>
            </div>
            <Link
              href="/investor-dashboard/history"
              className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1"
            >
              View all <ChevronRight size={12} />
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="px-6 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    tx.positive ? 'bg-emerald-50' : 'bg-red-50'
                  }`}>
                    {tx.positive
                      ? <ArrowDownLeft size={16} className="text-emerald-500" />
                      : <ArrowUpRight size={16} className="text-red-400" />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{tx.description}</p>
                    <p className="text-xs text-gray-400">{tx.date}</p>
                  </div>
                </div>
                <p className={`text-sm font-bold tabular-nums ${tx.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                  {tx.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}