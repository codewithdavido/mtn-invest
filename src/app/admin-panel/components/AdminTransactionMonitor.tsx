'use client';
import React, { useState } from 'react';
import { AlertTriangle, Search, Flag, Eye, ChevronLeft, ChevronRight, ArrowDownLeft, ArrowUpRight, RefreshCw } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { toast } from 'sonner';

type TxStatus = 'completed' | 'pending' | 'processing' | 'failed' | 'reversed' | 'flagged';
type TxType = 'deposit' | 'withdrawal' | 'interest' | 'reinvestment';

interface AdminTx {
  id: string;
  ref: string;
  type: TxType;
  investorName: string;
  accountNo: string;
  plan: string;
  amount: number;
  direction: 'in' | 'out';
  status: TxStatus;
  date: string;
  momoRef: string;
  flagReason?: string;
}

const adminTransactions: AdminTx[] = [
  { id: 'atx-001', ref: 'MTN-INV-2604070', type: 'deposit',      investorName: 'Kwame Osei',       accountNo: 'MTN-INV-00841', plan: 'Y\'ello Savings',   amount: 200,    direction: 'in',  status: 'completed',  date: '07 Apr 2026 14:32', momoRef: 'MM-8847291' },
  { id: 'atx-002', ref: 'MTN-INV-2604071', type: 'withdrawal',   investorName: 'Kwame Osei',       accountNo: 'MTN-INV-00841', plan: 'Pesewa Susu',       amount: 620,    direction: 'out', status: 'pending',    date: '05 Apr 2026 09:15', momoRef: 'MM-8841047' },
  { id: 'atx-003', ref: 'MTN-INV-2604065', type: 'deposit',      investorName: 'Kofi Boateng',     accountNo: 'MTN-INV-00843', plan: 'Fixed Deposit 12M', amount: 15000,  direction: 'in',  status: 'flagged',    date: '04 Apr 2026 22:47', momoRef: 'MM-8838901', flagReason: 'Unusually large deposit outside business hours' },
  { id: 'atx-004', ref: 'MTN-INV-2604060', type: 'interest',     investorName: 'Esi Antwi',        accountNo: 'MTN-INV-00850', plan: 'Fixed Deposit 12M', amount: 284,    direction: 'in',  status: 'completed',  date: '31 Mar 2026 00:01', momoRef: 'AUTO-CREDIT' },
  { id: 'atx-005', ref: 'MTN-INV-2604058', type: 'withdrawal',   investorName: 'Yaw Asante',       accountNo: 'MTN-INV-00847', plan: 'Fixed Deposit 6M',  amount: 3100,   direction: 'out', status: 'flagged',    date: '15 Mar 2026 11:20', momoRef: 'MM-8801234', flagReason: 'Withdrawal to unregistered MoMo number' },
  { id: 'atx-006', ref: 'MTN-INV-2604055', type: 'deposit',      investorName: 'Abena Mensah',     accountNo: 'MTN-INV-00842', plan: 'Y\'ello Savings',   amount: 400,    direction: 'in',  status: 'completed',  date: '05 Apr 2026 10:30', momoRef: 'MM-8840221' },
  { id: 'atx-007', ref: 'MTN-INV-2604052', type: 'deposit',      investorName: 'Akosua Frimpong',  accountNo: 'MTN-INV-00848', plan: 'Pesewa Susu',       amount: 100,    direction: 'in',  status: 'processing', date: '06 Apr 2026 16:05', momoRef: 'MM-8843990' },
  { id: 'atx-008', ref: 'MTN-INV-2604048', type: 'reinvestment', investorName: 'Emmanuel Tetteh',  accountNo: 'MTN-INV-00845', plan: 'Fixed Deposit 6M',  amount: 5800,   direction: 'in',  status: 'completed',  date: '03 Apr 2026 09:00', momoRef: 'AUTO-REINVEST' },
  { id: 'atx-009', ref: 'MTN-INV-2604044', type: 'deposit',      investorName: 'Fatima Al-Hassan', accountNo: 'MTN-INV-00844', plan: 'Y\'ello Savings',   amount: 200,    direction: 'in',  status: 'failed',     date: '01 Apr 2026 14:10', momoRef: 'MM-8830112' },
  { id: 'atx-010', ref: 'MTN-INV-2604039', type: 'interest',     investorName: 'Kofi Boateng',     accountNo: 'MTN-INV-00843', plan: 'Fixed Deposit 12M', amount: 362,    direction: 'in',  status: 'completed',  date: '31 Mar 2026 00:01', momoRef: 'AUTO-CREDIT' },
  { id: 'atx-011', ref: 'MTN-INV-2604035', type: 'deposit',      investorName: 'Ama Darko',        accountNo: 'MTN-INV-00846', plan: 'Y\'ello Savings',   amount: 500,    direction: 'in',  status: 'completed',  date: '04 Apr 2026 08:45', momoRef: 'MM-8836540' },
  { id: 'atx-012', ref: 'MTN-INV-2604031', type: 'withdrawal',   investorName: 'Nana Adu',         accountNo: 'MTN-INV-00849', plan: 'Y\'ello Savings',   amount: 300,    direction: 'out', status: 'completed',  date: '02 Apr 2026 12:00', momoRef: 'MM-8828773' },
];

const typeIconMap: Record<TxType, React.ReactNode> = {
  deposit:     <ArrowDownLeft size={13} />,
  withdrawal:  <ArrowUpRight size={13} />,
  interest:    <RefreshCw size={13} />,
  reinvestment:<RefreshCw size={13} />,
};

export default function AdminTransactionMonitor() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TxStatus | 'all'>('all');
  const [page, setPage] = useState(1);
  const perPage = 8;

  const flaggedCount = adminTransactions.filter(t => t.status === 'flagged').length;

  const filtered = adminTransactions.filter(t => {
    const matchSearch = t.ref.toLowerCase().includes(search.toLowerCase()) ||
      t.investorName.toLowerCase().includes(search.toLowerCase()) ||
      t.accountNo.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleResolveFlag = (id: string) => {
    // TODO: Connect to backend /api/admin/transactions/:id/resolve-flag
    toast.success('Flag resolved', { description: 'Transaction cleared for processing.' });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Transaction Monitor</h3>
            <p className="text-sm text-gray-400 mt-0.5">{filtered.length} transactions · Platform-wide</p>
          </div>
          {flaggedCount > 0 && (
            <div className="flex items-center gap-1.5 bg-red-50 border border-red-100 text-red-600 px-3 py-1.5 rounded-xl">
              <AlertTriangle size={14} />
              <span className="text-xs font-bold">{flaggedCount} flagged</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search ref, investor, account..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-transparent w-56 transition-all duration-150"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value as TxStatus | 'all'); setPage(1); }}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mtn-yellow text-gray-700 bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="flagged">Flagged</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {['Reference', 'Type', 'Investor', 'Account No.', 'Plan', 'Amount', 'Date', 'MoMo Ref', 'Status', 'Actions'].map(col => (
                <th key={`admin-th-${col}`} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-5 py-16 text-center">
                  <Search size={32} className="mx-auto text-gray-200 mb-3" />
                  <p className="text-sm font-semibold text-gray-400">No transactions match your filters</p>
                </td>
              </tr>
            ) : (
              paginated.map((txn) => (
                <React.Fragment key={txn.id}>
                  <tr className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors duration-100 group ${txn.status === 'flagged' ? 'bg-red-50/40' : ''}`}>
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs font-medium text-gray-600">{txn.ref}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${txn.direction === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                          {typeIconMap[txn.type]}
                        </span>
                        <span className="text-xs text-gray-600 capitalize whitespace-nowrap">{txn.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-medium text-gray-900 whitespace-nowrap">{txn.investorName}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs text-gray-500">{txn.accountNo}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-gray-500 whitespace-nowrap">{txn.plan}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-sm font-bold tabular-nums ${txn.direction === 'in' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {txn.direction === 'in' ? '+' : '-'}GH₵ {txn.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-gray-500 whitespace-nowrap">{txn.date}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs text-gray-400">{txn.momoRef}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      {txn.status === 'flagged' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                          <Flag size={10} className="fill-red-600" />
                          Flagged
                        </span>
                      ) : (
                        <Badge variant={txn.status as 'completed' | 'pending' | 'processing' | 'failed'} />
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <button
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150"
                          title="View transaction detail"
                        >
                          <Eye size={13} />
                        </button>
                        {txn.status === 'flagged' && (
                          <button
                            onClick={() => handleResolveFlag(txn.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-150"
                            title="Resolve flag — clear this transaction"
                          >
                            <Flag size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  {txn.status === 'flagged' && txn.flagReason && (
                    <tr key={`flag-reason-${txn.id}`} className="border-b border-red-100 bg-red-50/60">
                      <td colSpan={10} className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle size={12} className="text-red-400 shrink-0" />
                          <span className="text-xs text-red-600 font-medium">Flag reason: {txn.flagReason}</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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
                key={`monitor-page-${i + 1}`}
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