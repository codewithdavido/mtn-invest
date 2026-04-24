'use client';

import React, { useState } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  CircleDollarSign,
  TrendingUp,
  CreditCard,
  Search,
  Filter,
  History,
} from 'lucide-react';

type TxType = 'All' | 'Deposit' | 'Withdrawal' | 'Return' | 'Investment';

const transactions = [
  { id: 'tx-1',  name: 'Chioma Okafor',    type: 'Return',     description: 'Monthly return — Standard Plan', amount: '+₦13,350',  date: 'Apr 1, 2026',  status: 'Success',   positive: true  },
  { id: 'tx-2',  name: 'Emeka Nwosu',      type: 'Deposit',    description: 'Card deposit',                   amount: '+₦50,000',  date: 'Apr 17, 2026', status: 'Success',   positive: true  },
  { id: 'tx-3',  name: 'Fatima Abdullahi', type: 'Investment', description: 'Elite Plan — 50 shares',         amount: '-₦445,000', date: 'Apr 1, 2026',  status: 'Success',   positive: false },
  { id: 'tx-4',  name: 'Tunde Adeyemi',    type: 'Withdrawal', description: 'Withdrawal to First Bank',       amount: '-₦9,345',   date: 'Apr 4, 2026',  status: 'Processed', positive: false },
  { id: 'tx-5',  name: 'Ngozi Eze',        type: 'Return',     description: 'Monthly return — Premium Plan',  amount: '+₦26,700',  date: 'Apr 1, 2026',  status: 'Success',   positive: true  },
  { id: 'tx-6',  name: 'Bola Adesanya',    type: 'Deposit',    description: 'Card deposit',                   amount: '+₦20,000',  date: 'Apr 15, 2026', status: 'Success',   positive: true  },
  { id: 'tx-7',  name: 'Chioma Okafor',    type: 'Withdrawal', description: 'Withdrawal to GTBank',           amount: '-₦13,350',  date: 'Mar 28, 2026', status: 'Processed', positive: false },
  { id: 'tx-8',  name: 'Emeka Nwosu',      type: 'Investment', description: 'Basic Plan — 4 shares',          amount: '-₦35,600',  date: 'Feb 1, 2026',  status: 'Success',   positive: false },
  { id: 'tx-9',  name: 'Ngozi Eze',        type: 'Deposit',    description: 'Card deposit',                   amount: '+₦200,000', date: 'Mar 1, 2026',  status: 'Success',   positive: true  },
  { id: 'tx-10', name: 'Tunde Adeyemi',    type: 'Return',     description: 'Monthly return — Custom Plan',   amount: '+₦9,345',   date: 'Mar 1, 2026',  status: 'Success',   positive: true  },
];

const txIcons: Record<string, React.ElementType> = {
  Return:     CircleDollarSign,
  Deposit:    CreditCard,
  Withdrawal: ArrowUpRight,
  Investment: TrendingUp,
};

const txColors: Record<string, string> = {
  Return:     'bg-emerald-50 text-emerald-500',
  Deposit:    'bg-blue-50 text-blue-500',
  Withdrawal: 'bg-red-50 text-red-400',
  Investment: 'bg-purple-50 text-purple-500',
};

export default function TransactionsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<TxType>('All');

  const filtered = transactions.filter(tx => {
    const matchSearch = tx.name.toLowerCase().includes(search.toLowerCase()) ||
      tx.description.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || tx.type === typeFilter;
    return matchSearch && matchType;
  });

  const totalDeposits    = transactions.filter(t => t.type === 'Deposit').length;
  const totalWithdrawals = transactions.filter(t => t.type === 'Withdrawal').length;
  const totalReturns     = transactions.filter(t => t.type === 'Return').length;
  const totalInvestments = transactions.filter(t => t.type === 'Investment').length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
        <p className="text-gray-500 mt-1 text-sm">Full transaction history across all investors</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Deposits',    value: totalDeposits.toString(),    color: 'bg-blue-500',    icon: CreditCard       },
          { label: 'Withdrawals', value: totalWithdrawals.toString(), color: 'bg-red-500',     icon: ArrowUpRight     },
          { label: 'Returns',     value: totalReturns.toString(),     color: 'bg-emerald-500', icon: CircleDollarSign },
          { label: 'Investments', value: totalInvestments.toString(), color: 'bg-purple-500',  icon: TrendingUp       },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
              <card.icon size={20} className="text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
            <p className="text-xs text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            title="Search transactions"
            placeholder="Search by investor name or description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Filter size={14} className="text-gray-400" />
          <span className="text-xs font-semibold text-gray-500">Type:</span>
          {(['All', 'Deposit', 'Withdrawal', 'Return', 'Investment'] as TxType[]).map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                typeFilter === t ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions list */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History size={16} className="text-mtn-yellow-dark" />
            <h3 className="text-sm font-bold text-gray-900">All Transactions</h3>
          </div>
          <span className="text-xs text-gray-400">{filtered.length} records</span>
        </div>
        <div className="divide-y divide-gray-50">
          {filtered.map(tx => {
            const Icon = txIcons[tx.type];
            return (
              <div key={tx.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${txColors[tx.type]}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{tx.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-gray-400">{tx.description}</p>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <p className="text-xs text-gray-400">{tx.date}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold tabular-nums ${tx.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                    {tx.amount}
                  </p>
                  <span className={`text-xs font-semibold ${
                    tx.status === 'Success' || tx.status === 'Processed' ? 'text-emerald-500' : 'text-orange-500'
                  }`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <History size={40} className="text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}