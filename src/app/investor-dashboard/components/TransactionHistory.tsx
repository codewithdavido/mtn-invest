'use client';
import React, { useState } from 'react';
import { Search, Filter, ArrowDownLeft, ArrowUpRight, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';

type TxStatus = 'completed' | 'pending' | 'processing' | 'failed' | 'reversed';
type TxType = 'deposit' | 'withdrawal' | 'interest' | 'reinvestment';

interface Transaction {
  id: string;
  ref: string;
  type: TxType;
  plan: string;
  amount: number;
  direction: 'in' | 'out';
  status: TxStatus;
  date: string;
  time: string;
  momoRef: string;
}

const transactions: Transaction[] = [
  { id: 'txn-001', ref: 'MTN-INV-2604070', type: 'deposit',      plan: 'Y\'ello Savings',   amount: 200.00,   direction: 'in',  status: 'completed',  date: '07 Apr 2026', time: '14:32', momoRef: 'MM-8847291' },
  { id: 'txn-002', ref: 'MTN-INV-2604071', type: 'withdrawal',   plan: 'Pesewa Susu',       amount: 620.00,   direction: 'out', status: 'pending',    date: '05 Apr 2026', time: '09:15', momoRef: 'MM-8841047' },
  { id: 'txn-003', ref: 'MTN-INV-2603082', type: 'interest',     plan: 'Fixed Deposit 12M', amount: 162.40,   direction: 'in',  status: 'completed',  date: '31 Mar 2026', time: '00:01', momoRef: 'AUTO-CREDIT' },
  { id: 'txn-004', ref: 'MTN-INV-2603041', type: 'deposit',      plan: 'Fixed Deposit 6M',  amount: 500.00,   direction: 'in',  status: 'completed',  date: '14 Mar 2026', time: '11:44', momoRef: 'MM-8795302' },
  { id: 'txn-005', ref: 'MTN-INV-2602282', type: 'interest',     plan: 'Y\'ello Savings',   amount: 12.60,    direction: 'in',  status: 'completed',  date: '28 Feb 2026', time: '00:01', momoRef: 'AUTO-CREDIT' },
  { id: 'txn-006', ref: 'MTN-INV-2602155', type: 'deposit',      plan: 'Pesewa Susu',       amount: 100.00,   direction: 'in',  status: 'completed',  date: '15 Feb 2026', time: '08:30', momoRef: 'MM-8762009' },
  { id: 'txn-007', ref: 'MTN-INV-2601311', type: 'reinvestment', plan: 'Fixed Deposit 12M', amount: 8500.00,  direction: 'in',  status: 'completed',  date: '14 Jan 2026', time: '10:00', momoRef: 'AUTO-REINVEST' },
  { id: 'txn-008', ref: 'MTN-INV-2601103', type: 'deposit',      plan: 'Y\'ello Savings',   amount: 150.00,   direction: 'in',  status: 'failed',     date: '10 Jan 2026', time: '16:22', momoRef: 'MM-8720441' },
  { id: 'txn-009', ref: 'MTN-INV-2512291', type: 'interest',     plan: 'Fixed Deposit 6M',  amount: 39.25,    direction: 'in',  status: 'completed',  date: '31 Dec 2025', time: '00:01', momoRef: 'AUTO-CREDIT' },
  { id: 'txn-010', ref: 'MTN-INV-2512152', type: 'deposit',      plan: 'Fixed Deposit 6M',  amount: 2700.00,  direction: 'in',  status: 'completed',  date: '14 Dec 2025', time: '13:05', momoRef: 'MM-8681204' },
];

const typeIconMap: Record<TxType, React.ReactNode> = {
  deposit:     <ArrowDownLeft size={14} />,
  withdrawal:  <ArrowUpRight size={14} />,
  interest:    <RefreshCw size={14} />,
  reinvestment:<RefreshCw size={14} />,
};

const typeLabel: Record<TxType, string> = {
  deposit: 'Deposit', withdrawal: 'Withdrawal', interest: 'Interest Credit', reinvestment: 'Reinvestment',
};

export default function TransactionHistory() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<TxType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<TxStatus | 'all'>('all');
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = transactions.filter(t => {
    const matchSearch = t.ref.toLowerCase().includes(search.toLowerCase()) || t.plan.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || t.type === filterType;
    const matchStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-gray-100">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Transaction History</h3>
          <p className="text-sm text-gray-400 mt-0.5">{filtered.length} transactions found</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ref or plan..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-transparent w-52 transition-all duration-150"
            />
          </div>
          {/* Type filter */}
          <select
            value={filterType}
            onChange={e => { setFilterType(e.target.value as TxType | 'all'); setPage(1); }}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mtn-yellow text-gray-700 bg-white transition-all duration-150"
          >
            <option value="all">All Types</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
            <option value="interest">Interest Credits</option>
            <option value="reinvestment">Reinvestments</option>
          </select>
          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={e => { setFilterStatus(e.target.value as TxStatus | 'all'); setPage(1); }}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mtn-yellow text-gray-700 bg-white transition-all duration-150"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Reference', 'Type', 'Plan', 'Amount', 'Date & Time', 'MoMo Ref', 'Status'].map(col => (
                <th key={`col-${col}`} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center">
                  <Filter size={32} className="mx-auto text-gray-200 mb-3" />
                  <p className="text-sm font-semibold text-gray-400">No transactions match your filters</p>
                  <p className="text-xs text-gray-300 mt-1">Try adjusting your search or filter criteria</p>
                </td>
              </tr>
            ) : (
              paginated.map((txn) => (
                <tr key={txn.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors duration-100 group">
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs font-medium text-gray-600">{txn.ref}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${txn.direction === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                        {typeIconMap[txn.type]}
                      </span>
                      <span className="text-sm text-gray-700 whitespace-nowrap">{typeLabel[txn.type]}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-gray-600 whitespace-nowrap">{txn.plan}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-sm font-bold tabular-nums ${txn.direction === 'in' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {txn.direction === 'in' ? '+' : '-'}GH₵ {txn.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-gray-700 whitespace-nowrap">{txn.date}</p>
                    <p className="text-xs text-gray-400">{txn.time}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs text-gray-500">{txn.momoRef}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={txn.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length} transactions
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={`page-${i + 1}`}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all duration-150 ${page === i + 1 ? 'bg-mtn-yellow text-black' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}