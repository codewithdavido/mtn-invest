'use client';

import React, { useEffect, useState } from 'react';
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
import { useAuth } from '@/context/AuthContext';
import { getUserProfile, getTransactions, getInvestments } from '@/lib/auth';

const quickActions = [
  { id: 'qa-invest',   label: 'Invest',   icon: TrendingUp,    href: '/investor-dashboard/invest',   style: 'bg-mtn-yellow text-black hover:bg-mtn-yellow-dark' },
  { id: 'qa-deposit',  label: 'Deposit',  icon: ArrowUpRight,  href: '/investor-dashboard/deposit',  style: 'bg-gray-900 text-white hover:bg-gray-800' },
  { id: 'qa-withdraw', label: 'Withdraw', icon: ArrowDownLeft, href: '/investor-dashboard/withdraw', style: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50' },
];

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

function getHour() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getNextPayoutDate() {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return next.toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function DashboardHome() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [investments, setInvestments] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      getUserProfile(user.uid).then(setProfile);
      getInvestments(user.uid).then(setInvestments);
      getTransactions(user.uid).then(setTransactions);
    }
  }, [user]);

  // Calculate summary data from real data
  const walletBalance = profile?.walletBalance || 0;
  const totalInvested = investments.reduce((sum: number, inv: any) => sum + inv.investment, 0);
  const totalShares = investments.reduce((sum: number, inv: any) => sum + inv.shares, 0);
  const totalReturns = investments.reduce((sum: number, inv: any) => sum + (inv.totalEarned || 0), 0);
  const expectedMonthly = investments.reduce((sum: number, inv: any) => sum + inv.monthlyReturn, 0);
  const recentTx = transactions.slice(0, 5);

  return (
    <div className="space-y-6">

      {/* Welcome banner */}
      <div className="bg-gray-900 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-mtn-yellow text-sm font-semibold mb-1">
            {getHour()}, {profile?.fullName?.split(' ')[0] ?? 'there'} 👋
          </p>
          <h2 className="text-xl font-bold text-white">
            {investments.length > 0
              ? `You have ${investments.length} active investment plan${investments.length > 1 ? 's' : ''}`
              : 'Welcome! Start your first investment today'
            }
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
        <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="w-11 h-11 rounded-xl bg-mtn-yellow flex items-center justify-center mb-4">
            <Wallet size={20} className="text-black" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{formatNaira(walletBalance)}</p>
          <p className="text-sm font-medium text-gray-500">Wallet Balance</p>
          <p className="text-xs text-gray-400 mt-0.5">Available to invest</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="w-11 h-11 rounded-xl bg-gray-900 flex items-center justify-center mb-4">
            <TrendingUp size={20} className="text-mtn-yellow" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{formatNaira(totalInvested)}</p>
          <p className="text-sm font-medium text-gray-500">Total Invested</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {totalShares} share{totalShares !== 1 ? 's' : ''} across {investments.length} plan{investments.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center mb-4">
            <CircleDollarSign size={20} className="text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{formatNaira(totalReturns)}</p>
          <p className="text-sm font-medium text-gray-500">Total Returns Earned</p>
          <p className="text-xs text-gray-400 mt-0.5">Since you joined</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="w-11 h-11 rounded-xl bg-blue-500 flex items-center justify-center mb-4">
            <Clock size={20} className="text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{getNextPayoutDate()}</p>
          <p className="text-sm font-medium text-gray-500">Next Payout</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {formatNaira(expectedMonthly)} expected
          </p>
        </div>
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
            {investments.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">No active plans yet</p>
            ) : (
              investments.slice(0, 3).map((plan: any, index: number) => (
                <div key={index} className="px-6 py-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{plan.planName} Plan</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {plan.shares} shares · Started {new Date(plan.startDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
                      {plan.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-1">Invested</p>
                      <p className="text-sm font-bold text-gray-900">{formatNaira(plan.investment)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-1">Monthly</p>
                      <p className="text-sm font-bold text-emerald-600">{formatNaira(plan.monthlyReturn)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-1">Earned</p>
                      <p className="text-sm font-bold text-gray-900">{formatNaira(plan.totalEarned || 0)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
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
            {recentTx.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">No transactions yet</p>
            ) : (
              recentTx.map((tx: any, index: number) => (
                <div key={index} className="px-6 py-3.5 flex items-center justify-between">
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
                      <p className="text-xs text-gray-400">
                        {new Date(tx.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <p className={`text-sm font-bold tabular-nums ${tx.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                    {tx.positive ? '+' : '-'}{formatNaira(tx.amount)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}