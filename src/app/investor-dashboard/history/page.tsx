'use client';

import React, { useState, useEffect } from 'react';
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
import { useAuth } from '@/context/AuthContext';
import { getTransactions, getInvestments } from '@/lib/auth';

type TabId = 'active' | 'transactions' | 'returns';
type TransactionType = 'All' | 'Deposit' | 'Withdrawal' | 'Return' | 'Investment';

const tabs = [
  { id: 'active' as TabId,       label: 'Active Investments', icon: TrendingUp },
  { id: 'transactions' as TabId, label: 'Transactions',       icon: History    },
  { id: 'returns' as TabId,      label: 'Monthly Returns',    icon: Calendar   },
];

const txFilters: TransactionType[] = ['All', 'Deposit', 'Withdrawal', 'Return', 'Investment'];

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

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
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('active');
  const [txFilter, setTxFilter] = useState<TransactionType>('All');
  const [investments, setInvestments] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      getInvestments(user.uid).then(setInvestments);
      getTransactions(user.uid).then(setTransactions);
    }
  }, [user]);

  // Calculate summary data
  const totalInvested = investments.reduce((sum: number, inv: any) => sum + inv.investment, 0);
  const totalShares = investments.reduce((sum: number, inv: any) => sum + inv.shares, 0);
  const totalReturns = investments.reduce((sum: number, inv: any) => sum + (inv.totalEarned || 0), 0);
  const totalWithdrawn = transactions
    .filter((tx: any) => tx.type === 'Withdrawal')
    .reduce((sum: number, tx: any) => sum + tx.amount, 0);

  // Get return transactions grouped by month
  const returnTxs = transactions.filter((tx: any) => tx.type === 'Return');
  const returnsByMonth = returnTxs.reduce((acc: any, tx: any) => {
    const month = new Date(tx.date).toLocaleDateString('en-NG', { month: 'long', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = { month, total: 0, date: tx.date, count: 0 };
    }
    acc[month].total += tx.amount;
    acc[month].count += 1;
    return acc;
  }, {});
  const monthlyReturns = Object.values(returnsByMonth);

  const filteredTx = txFilter === 'All'
    ? transactions
    : transactions.filter((tx: any) => tx.type === txFilter);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Investment History</h2>
        <p className="text-gray-500 mt-1 text-sm">Track all your investments, transactions and returns</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="w-11 h-11 rounded-xl bg-gray-900 flex items-center justify-center mb-4">
            <TrendingUp size={20} className="text-mtn-yellow" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{formatNaira(totalInvested)}</p>
          <p className="text-sm font-medium text-gray-500">Total Invested</p>
          <p className="text-xs text-gray-400 mt-0.5">{totalShares} shares</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center mb-4">
            <CircleDollarSign size={20} className="text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{formatNaira(totalReturns)}</p>
          <p className="text-sm font-medium text-gray-500">Total Returns Earned</p>
          <p className="text-xs text-gray-400 mt-0.5">All time</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="w-11 h-11 rounded-xl bg-blue-500 flex items-center justify-center mb-4">
            <Wallet size={20} className="text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{formatNaira(totalWithdrawn)}</p>
          <p className="text-sm font-medium text-gray-500">Total Withdrawn</p>
          <p className="text-xs text-gray-400 mt-0.5">All time</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="w-11 h-11 rounded-xl bg-mtn-yellow flex items-center justify-center mb-4">
            <BarChart3 size={20} className="text-black" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{investments.length}</p>
          <p className="text-sm font-medium text-gray-500">Active Plans</p>
          <p className="text-xs text-gray-400 mt-0.5">Currently running</p>
        </div>
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

      {/* Active Investments */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {investments.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No active plans yet</p>
          ) : (
            investments.map((plan: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{plan.planName} Plan</p>
                    <p className="text-sm text-gray-400 mt-0.5">
                      {plan.shares} shares · Started {new Date(plan.startDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full">
                    {plan.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1.5">Amount Invested</p>
                    <p className="text-base font-bold text-gray-900">{formatNaira(plan.investment)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1.5">Monthly Return</p>
                    <p className="text-base font-bold text-emerald-600">{formatNaira(plan.monthlyReturn)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1.5">Total Earned</p>
                    <p className="text-base font-bold text-gray-900">{formatNaira(plan.totalEarned || 0)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1.5">Capital Lock-in</p>
                    <p className="text-base font-bold text-orange-500">Permanent</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Transactions */}
      {activeTab === 'transactions' && (
        <div className="space-y-4">
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

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-50">
              {filteredTx.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No transactions yet</p>
              ) : (
                filteredTx.map((tx: any, index: number) => (
                  <div key={index} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getTxBg(tx.type)}`}>
                        {getTxIcon(tx.type, tx.positive)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{tx.description}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-xs text-gray-400">
                            {new Date(tx.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span className="text-xs font-medium text-gray-400">{tx.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold tabular-nums ${tx.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                        {tx.positive ? '+' : '-'}{formatNaira(tx.amount)}
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
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Monthly Returns */}
      {activeTab === 'returns' && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-50">
            {monthlyReturns.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">No returns credited yet</p>
            ) : (
              monthlyReturns.map((mr: any, index: number) => (
                <div key={index} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <CircleDollarSign size={18} className="text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{mr.month}</p>
                      <p className="text-xs text-gray-400">{mr.count} return{mr.count > 1 ? 's' : ''} credited</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600 tabular-nums">{formatNaira(mr.total)}</p>
                    <span className="text-xs font-semibold text-emerald-500">Credited</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}