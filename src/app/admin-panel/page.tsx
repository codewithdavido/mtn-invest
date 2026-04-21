'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  TrendingUp,
  CircleDollarSign,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Wallet,
} from 'lucide-react';

const summaryCards = [
  {
    id: 'card-investors',
    label: 'Total Investors',
    value: '1,247',
    sub: '+12 this week',
    icon: Users,
    color: 'bg-blue-500',
    iconColor: 'text-white',
    trend: 'up',
  },
  {
    id: 'card-invested',
    label: 'Total Amount Invested',
    value: '₦482,350,000',
    sub: 'Across all plans',
    icon: TrendingUp,
    color: 'bg-gray-900',
    iconColor: 'text-mtn-yellow',
    trend: 'up',
  },
  {
    id: 'card-returns',
    label: 'Returns Paid This Month',
    value: '₦241,175,000',
    sub: 'April 2026',
    icon: CircleDollarSign,
    color: 'bg-emerald-500',
    iconColor: 'text-white',
    trend: 'up',
  },
  {
    id: 'card-wallets',
    label: 'Total Wallet Balances',
    value: '₦28,450,000',
    sub: 'Across all users',
    icon: Wallet,
    color: 'bg-mtn-yellow',
    iconColor: 'text-black',
    trend: 'up',
  },
  {
    id: 'card-withdrawals',
    label: 'Pending Withdrawals',
    value: '23',
    sub: 'Awaiting processing',
    icon: ArrowDownLeft,
    color: 'bg-orange-500',
    iconColor: 'text-white',
    trend: 'neutral',
  },
  {
    id: 'card-shares',
    label: 'Total Shares Held',
    value: '54,197',
    sub: 'By all investors',
    icon: ArrowUpRight,
    color: 'bg-purple-500',
    iconColor: 'text-white',
    trend: 'up',
  },
];

const recentInvestors = [
  { id: 'inv-1', name: 'Chioma Okafor',   email: 'chioma@email.com',  plan: 'Standard', shares: 10, joined: 'Apr 18, 2026', status: 'Active' },
  { id: 'inv-2', name: 'Emeka Nwosu',     email: 'emeka@email.com',   plan: 'Basic',    shares: 4,  joined: 'Apr 17, 2026', status: 'Active' },
  { id: 'inv-3', name: 'Fatima Abdullahi',email: 'fatima@email.com',  plan: 'Elite',    shares: 50, joined: 'Apr 16, 2026', status: 'Active' },
  { id: 'inv-4', name: 'Tunde Adeyemi',   email: 'tunde@email.com',   plan: 'Custom',   shares: 7,  joined: 'Apr 15, 2026', status: 'Active' },
  { id: 'inv-5', name: 'Ngozi Eze',       email: 'ngozi@email.com',   plan: 'Premium',  shares: 20, joined: 'Apr 14, 2026', status: 'Active' },
];

const pendingWithdrawals = [
  { id: 'wd-1', name: 'Chioma Okafor',    amount: '₦17,800', bank: 'GTBank',    date: 'Apr 19, 2026', status: 'Pending'    },
  { id: 'wd-2', name: 'Emeka Nwosu',      amount: '₦17,800', bank: 'Zenith',    date: 'Apr 19, 2026', status: 'Pending'    },
  { id: 'wd-3', name: 'Ngozi Eze',        amount: '₦89,000', bank: 'Access',    date: 'Apr 18, 2026', status: 'Processing' },
  { id: 'wd-4', name: 'Tunde Adeyemi',    amount: '₦17,800', bank: 'First Bank',date: 'Apr 18, 2026', status: 'Pending'    },
];

const recentTransactions = [
  { id: 'tx-1', type: 'Return',     name: 'Chioma Okafor',    amount: '+₦17,800',  date: 'Apr 1, 2026',  positive: true  },
  { id: 'tx-2', type: 'Deposit',    name: 'Emeka Nwosu',      amount: '+₦50,000',  date: 'Apr 17, 2026', positive: true  },
  { id: 'tx-3', type: 'Investment', name: 'Fatima Abdullahi', amount: '-₦445,000', date: 'Apr 16, 2026', positive: false },
  { id: 'tx-4', type: 'Withdrawal', name: 'Tunde Adeyemi',    amount: '-₦17,800',  date: 'Apr 15, 2026', positive: false },
  { id: 'tx-5', type: 'Return',     name: 'Ngozi Eze',        amount: '+₦89,000',  date: 'Apr 1, 2026',  positive: true  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">

      {/* Welcome banner */}
      <div className="bg-gray-950 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-mtn-yellow text-sm font-semibold mb-1">Admin Overview</p>
          <h2 className="text-xl font-bold text-white">Good morning, Admin 👋</h2>
          <p className="text-gray-400 text-sm mt-1">
            {new Date().toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin-panel/monthly-returns"
            className="shrink-0 inline-flex items-center gap-2 bg-mtn-yellow text-black font-bold px-5 py-2.5 rounded-xl hover:bg-mtn-yellow-dark transition-all duration-150 active:scale-95 text-sm"
          >
            <CircleDollarSign size={16} />
            Credit Returns
          </Link>
          <Link
            href="/admin-panel/withdrawals"
            className="shrink-0 inline-flex items-center gap-2 bg-white/10 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-white/20 transition-all duration-150 text-sm"
          >
            <ArrowDownLeft size={16} />
            Withdrawals
          </Link>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {summaryCards.map((card) => (
          <div key={card.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center`}>
                <card.icon size={20} className={card.iconColor} />
              </div>
              {card.trend === 'up' && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">↑ Up</span>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
            <p className="text-sm font-medium text-gray-500">{card.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent investors */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-blue-500" />
              <h3 className="text-sm font-bold text-gray-900">Recent Investors</h3>
            </div>
            <Link
              href="/admin-panel/investors"
              className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1"
            >
              View all <ChevronRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentInvestors.map(inv => (
              <div key={inv.id} className="px-6 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-mtn-yellow flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-black">
                      {inv.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{inv.name}</p>
                    <p className="text-xs text-gray-400">{inv.plan} · {inv.shares} shares · {inv.joined}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
                  {inv.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending withdrawals */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <AlertCircle size={18} className="text-orange-500" />
              <h3 className="text-sm font-bold text-gray-900">Pending Withdrawals</h3>
            </div>
            <Link
              href="/admin-panel/withdrawals"
              className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1"
            >
              View all <ChevronRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {pendingWithdrawals.map(wd => (
              <div key={wd.id} className="px-6 py-3.5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{wd.name}</p>
                  <p className="text-xs text-gray-400">{wd.bank} · {wd.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{wd.amount}</p>
                  <span className={`text-xs font-semibold ${
                    wd.status === 'Processing' ? 'text-blue-500' : 'text-orange-500'
                  }`}>
                    {wd.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick approve all button */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition-all duration-150">
              <CheckCircle2 size={16} />
              Process All Pending
            </button>
          </div>
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
            href="/admin-panel/transactions"
            className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1"
          >
            View all <ChevronRight size={12} />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentTransactions.map(tx => (
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
                  <p className="text-sm font-semibold text-gray-900">{tx.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-gray-400">{tx.date}</p>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="text-xs font-medium text-gray-400">{tx.type}</span>
                  </div>
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
  );
}