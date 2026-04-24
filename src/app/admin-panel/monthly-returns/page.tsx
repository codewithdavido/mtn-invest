'use client';

import React, { useState } from 'react';
import {
  CircleDollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  Play,
  Users,
} from 'lucide-react';

const returnHistory = [
  { id: 'ret-1', month: 'April 2026',    totalInvestors: 1247, totalPaid: '₦241,175,000', dateCredited: 'Apr 1, 2026',  status: 'Paid'    },
  { id: 'ret-2', month: 'March 2026',    totalInvestors: 1230, totalPaid: '₦238,365,000', dateCredited: 'Mar 1, 2026',  status: 'Paid'    },
  { id: 'ret-3', month: 'February 2026', totalInvestors: 1198, totalPaid: '₦231,912,600', dateCredited: 'Feb 1, 2026',  status: 'Paid'    },
  { id: 'ret-4', month: 'January 2026',  totalInvestors: 1150, totalPaid: '₦222,525,000', dateCredited: 'Jan 1, 2026',  status: 'Paid'    },
  { id: 'ret-5', month: 'May 2026',      totalInvestors: 1247, totalPaid: '₦241,175,000', dateCredited: 'May 1, 2026',  status: 'Upcoming'},
];

const investorReturns = [
  { id: 'ir-1', name: 'Chioma Okafor',    plan: 'Standard', shares: 10, amount: '₦13,350',  status: 'Credited', date: 'Apr 1, 2026' },
  { id: 'ir-2', name: 'Emeka Nwosu',      plan: 'Basic',    shares: 4,  amount: '₦5,340',   status: 'Credited', date: 'Apr 1, 2026' },
  { id: 'ir-3', name: 'Fatima Abdullahi', plan: 'Elite',    shares: 50, amount: '₦66,750',  status: 'Credited', date: 'Apr 1, 2026' },
  { id: 'ir-4', name: 'Tunde Adeyemi',    plan: 'Custom',   shares: 7,  amount: '₦9,345',   status: 'Credited', date: 'Apr 1, 2026' },
  { id: 'ir-5', name: 'Ngozi Eze',        plan: 'Premium',  shares: 20, amount: '₦26,700',  status: 'Credited', date: 'Apr 1, 2026' },
  { id: 'ir-6', name: 'Bola Adesanya',    plan: 'Basic',    shares: 4,  amount: '₦5,340',   status: 'Credited', date: 'Apr 1, 2026' },
];

export default function MonthlyReturnsPage() {
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [crediting, setCrediting] = useState(false);
  const [credited, setCredited] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('April 2026');

  const handleCredit = async () => {
    setCrediting(true);
    await new Promise(res => setTimeout(res, 2000));
    setCrediting(false);
    setCredited(true);
    setTimeout(() => {
      setCredited(false);
      setShowCreditModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Monthly Returns</h2>
          <p className="text-gray-500 mt-1 text-sm">Credit and manage monthly returns for all investors</p>
        </div>
        <button
          onClick={() => setShowCreditModal(true)}
          className="flex items-center gap-2 bg-mtn-yellow text-black font-bold px-5 py-2.5 rounded-xl hover:bg-mtn-yellow-dark transition-all duration-150 text-sm"
        >
          <Play size={16} />
          Credit Returns Now
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'This Month Paid',     value: '₦241,175,000', icon: CircleDollarSign, color: 'bg-emerald-500' },
          { label: 'Investors Paid',      value: '1,247',         icon: Users,            color: 'bg-blue-500'    },
          { label: 'Next Payout',         value: 'May 1, 2026',   icon: Clock,            color: 'bg-orange-500'  },
          { label: 'Total Paid All Time', value: '₦934,000,000',  icon: CheckCircle2,     color: 'bg-gray-900'    },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
              <card.icon size={20} className="text-white" />
            </div>
            <p className="text-xl font-bold text-gray-900 mb-1">{card.value}</p>
            <p className="text-xs text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Return history */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">Return History</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {returnHistory.map(ret => (
            <div key={ret.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  ret.status === 'Paid' ? 'bg-emerald-50' : 'bg-blue-50'
                }`}>
                  {ret.status === 'Paid'
                    ? <CheckCircle2 size={18} className="text-emerald-500" />
                    : <Clock size={18} className="text-blue-500" />
                  }
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{ret.month}</p>
                  <p className="text-xs text-gray-400">{ret.totalInvestors.toLocaleString()} investors · {ret.dateCredited}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{ret.totalPaid}</p>
                <span className={`text-xs font-semibold ${
                  ret.status === 'Paid' ? 'text-emerald-500' : 'text-blue-500'
                }`}>
                  {ret.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual returns for current month */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">April 2026 — Individual Returns</h3>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">All Credited</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Investor</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Plan</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Shares</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {investorReturns.map(ir => (
                <tr key={ir.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-mtn-yellow flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-black">{ir.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{ir.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-gray-600">{ir.plan}</td>
                  <td className="px-6 py-3.5 text-sm font-semibold text-gray-900">{ir.shares}</td>
                  <td className="px-6 py-3.5 text-sm font-bold text-emerald-600">{ir.amount}</td>
                  <td className="px-6 py-3.5 text-xs text-gray-400">{ir.date}</td>
                  <td className="px-6 py-3.5">
                    <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
                      {ir.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credit modal */}
      {showCreditModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-5">
            <div className="text-center">
              <div className="w-16 h-16 bg-mtn-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CircleDollarSign size={32} className="text-black" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Credit Monthly Returns</h3>
              <p className="text-sm text-gray-500">
                This will credit returns to all <strong>1,247 active investors</strong> for <strong>May 2026</strong>.
                Total amount: <strong className="text-emerald-600">₦241,175,000</strong>
              </p>
            </div>

            {credited ? (
              <div className="flex items-center justify-center gap-2 p-4 bg-emerald-50 rounded-xl text-emerald-700">
                <CheckCircle2 size={20} />
                <span className="text-sm font-bold">Returns credited successfully!</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
                  <AlertCircle size={18} className="text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-700">
                    This action will credit returns to all active investors immediately. This cannot be undone. Make sure it is the 1st of the month before proceeding.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCreditModal(false)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCredit}
                    disabled={crediting}
                    className="flex-1 py-3 rounded-xl bg-mtn-yellow text-black text-sm font-bold hover:bg-mtn-yellow-dark transition-all duration-150 disabled:opacity-60"
                  >
                    {crediting ? 'Crediting...' : 'Confirm & Credit'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}