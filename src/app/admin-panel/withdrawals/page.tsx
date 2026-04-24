'use client';

import React, { useState } from 'react';
import {
  ArrowDownLeft,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Filter,
  Eye,
  X,
  Banknote,
  User,
} from 'lucide-react';

type StatusFilter = 'All' | 'Pending' | 'Processing' | 'Processed' | 'Failed';

const withdrawals = [
  { id: 'wd-1',  name: 'Chioma Okafor',    email: 'chioma@email.com',  amount: '₦5,340',   bank: 'GTBank',     accNo: '0123456789', date: 'Apr 19, 2026', status: 'Pending'    },
  { id: 'wd-2',  name: 'Emeka Nwosu',      email: 'emeka@email.com',   amount: '₦5,340',   bank: 'Zenith',     accNo: '0987654321', date: 'Apr 19, 2026', status: 'Pending'    },
  { id: 'wd-3',  name: 'Ngozi Eze',        email: 'ngozi@email.com',   amount: '₦26,700',  bank: 'Access',     accNo: '1122334455', date: 'Apr 18, 2026', status: 'Processing' },
  { id: 'wd-4',  name: 'Tunde Adeyemi',    email: 'tunde@email.com',   amount: '₦5,340',   bank: 'First Bank', accNo: '2233445566', date: 'Apr 18, 2026', status: 'Pending'    },
  { id: 'wd-5',  name: 'Fatima Abdullahi', email: 'fatima@email.com',  amount: '₦66,750',  bank: 'Access',     accNo: '3344556677', date: 'Apr 17, 2026', status: 'Processed'  },
  { id: 'wd-6',  name: 'Bola Adesanya',    email: 'bola@email.com',    amount: '₦5,340',   bank: 'Fidelity',   accNo: '4455667788', date: 'Apr 17, 2026', status: 'Processed'  },
  { id: 'wd-7',  name: 'Chioma Okafor',    email: 'chioma@email.com',  amount: '₦13,350',  bank: 'GTBank',     accNo: '0123456789', date: 'Apr 16, 2026', status: 'Failed'     },
];

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  Pending:    { color: 'bg-orange-50 text-orange-600', icon: Clock        },
  Processing: { color: 'bg-blue-50 text-blue-600',    icon: Clock        },
  Processed:  { color: 'bg-emerald-50 text-emerald-600', icon: CheckCircle2 },
  Failed:     { color: 'bg-red-50 text-red-600',      icon: XCircle      },
};

export default function WithdrawalsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [selected, setSelected] = useState<typeof withdrawals[0] | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const filtered = withdrawals.filter(w => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || w.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleProcess = async (id: string) => {
    setProcessingId(id);
    await new Promise(res => setTimeout(res, 1500));
    setProcessingId(null);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Withdrawals</h2>
        <p className="text-gray-500 mt-1 text-sm">Review and process investor withdrawal requests</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Withdrawals', value: withdrawals.length.toString(),                                                color: 'bg-gray-900',    icon: ArrowDownLeft },
          { label: 'Pending',           value: withdrawals.filter(w => w.status === 'Pending').length.toString(),           color: 'bg-orange-500',  icon: Clock         },
          { label: 'Processed',         value: withdrawals.filter(w => w.status === 'Processed').length.toString(),         color: 'bg-emerald-500', icon: CheckCircle2  },
          { label: 'Failed',            value: withdrawals.filter(w => w.status === 'Failed').length.toString(),            color: 'bg-red-500',     icon: XCircle       },
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
            title="Search withdrawals"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Filter size={14} className="text-gray-400" />
          <span className="text-xs font-semibold text-gray-500">Status:</span>
          {(['All', 'Pending', 'Processing', 'Processed', 'Failed'] as StatusFilter[]).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                statusFilter === s ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Process all pending */}
      {withdrawals.filter(w => w.status === 'Pending').length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-orange-500" />
            <p className="text-sm font-semibold text-orange-700">
              {withdrawals.filter(w => w.status === 'Pending').length} pending withdrawals awaiting processing
            </p>
          </div>
          <button className="flex items-center gap-2 bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-orange-600 transition-all duration-150">
            <CheckCircle2 size={15} />
            Process All
          </button>
        </div>
      )}

      {/* Withdrawals table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Investor</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Bank</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(wd => {
                const StatusIcon = statusConfig[wd.status].icon;
                return (
                  <tr key={wd.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-mtn-yellow flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-black">{wd.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{wd.name}</p>
                          <p className="text-xs text-gray-400">{wd.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{wd.amount}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">{wd.bank}</p>
                      <p className="text-xs text-gray-400">{wd.accNo}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">{wd.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusConfig[wd.status].color}`}>
                        <StatusIcon size={12} />
                        {wd.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelected(wd)}
                          aria-label={`View withdrawal for ${wd.name}`}
                          className="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-all duration-150"
                        >
                          <Eye size={12} />
                          View
                        </button>
                        {(wd.status === 'Pending' || wd.status === 'Processing') && (
                          <button
                            onClick={() => handleProcess(wd.id)}
                            disabled={processingId === wd.id}
                            aria-label={`Process withdrawal for ${wd.name}`}
                            className="flex items-center gap-1 text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 px-2.5 py-1.5 rounded-lg transition-all duration-150 disabled:opacity-60"
                          >
                            <CheckCircle2 size={12} />
                            {processingId === wd.id ? '...' : 'Process'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-gray-900">Withdrawal Details</p>
              <button aria-label="Close" onClick={() => setSelected(null)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <User size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{selected.name}</p>
                  <p className="text-xs text-gray-400">{selected.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Banknote size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{selected.bank}</p>
                  <p className="text-xs text-gray-400">{selected.accNo}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Amount</p>
                  <p className="text-base font-bold text-gray-900">{selected.amount}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Date</p>
                  <p className="text-sm font-bold text-gray-900">{selected.date}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Status</p>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusConfig[selected.status].color}`}>
                  {selected.status}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              {(selected.status === 'Pending' || selected.status === 'Processing') && (
                <button className="flex-1 py-3 rounded-xl bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition-all duration-150">
                  Mark as Processed
                </button>
              )}
              {selected.status === 'Pending' && (
                <button className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-all duration-150">
                  Reject
                </button>
              )}
              <button onClick={() => setSelected(null)} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-150">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}