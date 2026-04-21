'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  Users,
  TrendingUp,
  Wallet,
  X,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Banknote,
} from 'lucide-react';

// --- Types ---
type StatusFilter = 'All' | 'Active' | 'Inactive';
type PlanFilter = 'All' | 'Basic' | 'Standard' | 'Premium' | 'Elite' | 'Custom';

// --- Data ---
const investors = [
  {
    id: 'inv-1',
    name: 'Chioma Okafor',
    email: 'chioma@email.com',
    phone: '08012345678',
    plan: 'Standard',
    shares: 10,
    invested: '₦89,000',
    monthlyReturn: '₦44,500',
    walletBalance: '₦45,000',
    totalEarned: '₦89,000',
    joined: 'Jan 1, 2026',
    lastWithdrawal: 'Mar 28, 2026',
    bank: 'GTBank · 0123456789',
    card: 'Visa · ••••4242',
    status: 'Active',
  },
  {
    id: 'inv-2',
    name: 'Emeka Nwosu',
    email: 'emeka@email.com',
    phone: '08023456789',
    plan: 'Basic',
    shares: 4,
    invested: '₦35,600',
    monthlyReturn: '₦17,800',
    walletBalance: '₦17,800',
    totalEarned: '₦35,600',
    joined: 'Feb 1, 2026',
    lastWithdrawal: 'Mar 25, 2026',
    bank: 'Zenith · 0987654321',
    card: 'Mastercard · ••••1234',
    status: 'Active',
  },
  {
    id: 'inv-3',
    name: 'Fatima Abdullahi',
    email: 'fatima@email.com',
    phone: '08034567890',
    plan: 'Elite',
    shares: 50,
    invested: '₦445,000',
    monthlyReturn: '₦222,500',
    walletBalance: '₦222,500',
    totalEarned: '₦222,500',
    joined: 'Apr 1, 2026',
    lastWithdrawal: 'N/A',
    bank: 'Access · 1122334455',
    card: 'Visa · ••••5678',
    status: 'Active',
  },
  {
    id: 'inv-4',
    name: 'Tunde Adeyemi',
    email: 'tunde@email.com',
    phone: '08045678901',
    plan: 'Custom',
    shares: 7,
    invested: '₦62,300',
    monthlyReturn: '₦31,150',
    walletBalance: '₦10,000',
    totalEarned: '₦62,300',
    joined: 'Jan 15, 2026',
    lastWithdrawal: 'Apr 2, 2026',
    bank: 'First Bank · 2233445566',
    card: 'Verve · ••••9012',
    status: 'Active',
  },
  {
    id: 'inv-5',
    name: 'Ngozi Eze',
    email: 'ngozi@email.com',
    phone: '08056789012',
    plan: 'Premium',
    shares: 20,
    invested: '₦178,000',
    monthlyReturn: '₦89,000',
    walletBalance: '₦89,000',
    totalEarned: '₦178,000',
    joined: 'Mar 1, 2026',
    lastWithdrawal: 'N/A',
    bank: 'UBA · 3344556677',
    card: 'Mastercard · ••••3456',
    status: 'Active',
  },
  {
    id: 'inv-6',
    name: 'Bola Adesanya',
    email: 'bola@email.com',
    phone: '08067890123',
    plan: 'Basic',
    shares: 4,
    invested: '₦35,600',
    monthlyReturn: '₦17,800',
    walletBalance: '₦5,000',
    totalEarned: '₦17,800',
    joined: 'Dec 1, 2025',
    lastWithdrawal: 'Apr 1, 2026',
    bank: 'Fidelity · 4455667788',
    card: 'Visa · ••••7890',
    status: 'Inactive',
  },
];

const planColors: Record<string, string> = {
  Basic:    'bg-blue-50 text-blue-600',
  Standard: 'bg-purple-50 text-purple-600',
  Premium:  'bg-orange-50 text-orange-600',
  Elite:    'bg-red-50 text-red-600',
  Custom:   'bg-gray-100 text-gray-600',
};

export default function InvestorsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [planFilter, setPlanFilter] = useState<PlanFilter>('All');
  const [selectedInvestor, setSelectedInvestor] = useState<typeof investors[0] | null>(null);

  const filtered = investors.filter(inv => {
    const matchSearch = inv.name.toLowerCase().includes(search.toLowerCase()) ||
      inv.email.toLowerCase().includes(search.toLowerCase()) ||
      inv.phone.includes(search);
    const matchStatus = statusFilter === 'All' || inv.status === statusFilter;
    const matchPlan = planFilter === 'All' || inv.plan === planFilter;
    return matchSearch && matchStatus && matchPlan;
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Investors</h2>
          <p className="text-gray-500 mt-1 text-sm">Manage and view all registered investors</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl">
          <p className="text-sm font-bold text-blue-600">{investors.length} Total</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Investors',    value: investors.length.toString(),                                            icon: Users,     color: 'bg-blue-500'    },
          { label: 'Active',             value: investors.filter(i => i.status === 'Active').length.toString(),        icon: CheckCircle2, color: 'bg-emerald-500' },
          { label: 'Inactive',           value: investors.filter(i => i.status === 'Inactive').length.toString(),      icon: AlertCircle,  color: 'bg-red-500'     },
          { label: 'Total Shares Held',  value: investors.reduce((sum, i) => sum + i.shares, 0).toString(),            icon: TrendingUp,   color: 'bg-gray-900'    },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
              <card.icon size={18} className="text-white" />
            </div>
            <p className="text-xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            title="Search investors"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
          />
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400" />
            <span className="text-xs font-semibold text-gray-500">Status:</span>
            {(['All', 'Active', 'Inactive'] as StatusFilter[]).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  statusFilter === s
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Plan:</span>
            {(['All', 'Basic', 'Standard', 'Premium', 'Elite', 'Custom'] as PlanFilter[]).map(p => (
              <button
                key={p}
                onClick={() => setPlanFilter(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  planFilter === p
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Investors table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Investor</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Plan</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Shares</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Invested</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Monthly Return</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Wallet</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(inv => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-mtn-yellow flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-black">
                          {inv.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{inv.name}</p>
                        <p className="text-xs text-gray-400">{inv.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${planColors[inv.plan]}`}>
                      {inv.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">{inv.shares}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">{inv.invested}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-emerald-600">{inv.monthlyReturn}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">{inv.walletBalance}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      inv.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedInvestor(inv)}
                      aria-label={`View ${inv.name}`}
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

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Users size={40} className="text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">No investors found</p>
            </div>
          )}
        </div>
      </div>

      {/* Investor detail modal */}
      {selectedInvestor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-mtn-yellow flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-black">
                    {selectedInvestor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900">{selectedInvestor.name}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${planColors[selectedInvestor.plan]}`}>
                    {selectedInvestor.plan} Plan
                  </span>
                </div>
              </div>
              <button
                aria-label="Close modal"
                onClick={() => setSelectedInvestor(null)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-150"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal content */}
            <div className="px-6 py-5 space-y-5">

              {/* Contact info */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Contact</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={15} className="text-gray-400 shrink-0" />
                    <span className="text-gray-700">{selectedInvestor.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={15} className="text-gray-400 shrink-0" />
                    <span className="text-gray-700">{selectedInvestor.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar size={15} className="text-gray-400 shrink-0" />
                    <span className="text-gray-700">Joined {selectedInvestor.joined}</span>
                  </div>
                </div>
              </div>

              {/* Investment stats */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Investment</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Shares',          value: selectedInvestor.shares.toString(),    icon: TrendingUp      },
                    { label: 'Total Invested',   value: selectedInvestor.invested,             icon: TrendingUp      },
                    { label: 'Monthly Return',   value: selectedInvestor.monthlyReturn,        icon: TrendingUp      },
                    { label: 'Total Earned',     value: selectedInvestor.totalEarned,          icon: TrendingUp      },
                    { label: 'Wallet Balance',   value: selectedInvestor.walletBalance,        icon: Wallet          },
                    { label: 'Last Withdrawal',  value: selectedInvestor.lastWithdrawal,       icon: Calendar        },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                      <p className="text-sm font-bold text-gray-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment info */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Payment Details</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm p-3 bg-gray-50 rounded-xl">
                    <Banknote size={15} className="text-gray-400 shrink-0" />
                    <span className="text-gray-700">{selectedInvestor.bank}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm p-3 bg-gray-50 rounded-xl">
                    <CreditCard size={15} className="text-gray-400 shrink-0" />
                    <span className="text-gray-700">{selectedInvestor.card}</span>
                  </div>
                </div>
              </div>

              {/* Status toggle */}
              <div className="flex gap-3 pt-2">
                <button
                  aria-label="Deactivate investor"
                  className="flex-1 py-3 rounded-xl border border-red-200 text-sm font-semibold text-red-500 hover:bg-red-50 transition-all duration-150"
                >
                  Deactivate Account
                </button>
                <button
                  aria-label="Close investor detail"
                  onClick={() => setSelectedInvestor(null)}
                  className="flex-1 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-all duration-150"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}