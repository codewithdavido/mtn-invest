'use client';

import React, { useState } from 'react';
import {
  Banknote,
  Plus,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Trash2,
  Wallet,
  Info,
} from 'lucide-react';

const linkedBank = {
  id: 'bank-1',
  bankName: 'GTBank',
  accountNumber: '0123456789',
  accountName: 'Chioma Okafor',
};

const recentWithdrawals = [
  { id: 'wd-1', amount: '₦17,800', date: 'Mar 28, 2026', status: 'Processed' },
  { id: 'wd-2', amount: '₦17,800', date: 'Feb 25, 2026', status: 'Processed' },
  { id: 'wd-3', amount: '₦17,800', date: 'Jan 20, 2026', status: 'Processed' },
  { id: 'wd-4', amount: '₦17,800', date: 'Dec 18, 2025', status: 'Pending'   },
  { id: 'wd-5', amount: '₦17,800', date: 'Nov 10, 2025', status: 'Processed' },
];

const MINIMUM_WITHDRAWAL = 17800;
const WALLET_BALANCE = 45000;

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export default function WithdrawPage() {
  const [amount, setAmount] = useState('');
  const [hasBank, setHasBank] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const amountNum = parseFloat(amount.replace(/,/g, '')) || 0;
  const isValidAmount = amountNum >= MINIMUM_WITHDRAWAL && amountNum <= WALLET_BALANCE;
  const exceedsBalance = amountNum > WALLET_BALANCE;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const formatted = raw ? parseInt(raw).toLocaleString('en-NG') : '';
    setAmount(formatted);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleWithdraw = async () => {
    if (!isValidAmount) {
      setErrorMessage(`Minimum withdrawal is ${formatNaira(MINIMUM_WITHDRAWAL)}`);
      return;
    }
    if (!hasBank) {
      setErrorMessage('Please link a bank account first');
      return;
    }
    if (exceedsBalance) {
      setErrorMessage('Amount exceeds your wallet balance');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(res => setTimeout(res, 1500));
      setSuccessMessage(`₦${amount} withdrawal is being processed to your ${linkedBank.bankName} account. You'll receive it within 24 hours.`);
      setAmount('');
    } catch {
      setErrorMessage('Withdrawal failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Withdraw Funds</h2>
        <p className="text-gray-500 mt-1 text-sm">Withdraw your returns to your linked bank account</p>
      </div>

      {/* Wallet balance */}
      <div className="bg-gray-900 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">Available to Withdraw</p>
          <p className="text-3xl font-bold text-white">{formatNaira(WALLET_BALANCE)}</p>
          <p className="text-xs text-gray-500 mt-1">Wallet balance</p>
        </div>
        <div className="w-14 h-14 bg-mtn-yellow rounded-2xl flex items-center justify-center">
          <Wallet size={24} className="text-black" />
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-semibold mb-0.5">Withdrawal Rules</p>
          <p>Minimum withdrawal is {formatNaira(MINIMUM_WITHDRAWAL)}. You can withdraw once per month after your returns are credited on the 1st. Withdrawals are processed within 24 hours.</p>
        </div>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <CheckCircle size={18} className="text-emerald-500 shrink-0" />
          <p className="text-sm text-emerald-700">{successMessage}</p>
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle size={18} className="text-red-500 shrink-0" />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* Linked bank account */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Banknote size={16} className="text-mtn-yellow-dark" />
          Bank Account
        </h3>

        {hasBank ? (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-mtn-yellow text-xs font-bold">GTB</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{linkedBank.bankName}</p>
                <p className="text-xs text-gray-400">{linkedBank.accountNumber}</p>
                <p className="text-xs text-gray-400">{linkedBank.accountName}</p>
              </div>
            </div>
            <button
              onClick={() => setHasBank(false)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-150"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setHasBank(true)}
            className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:border-mtn-yellow hover:text-mtn-yellow-dark transition-all duration-150"
          >
            <Plus size={18} />
            Add Bank Account
          </button>
        )}
      </div>

      {/* Withdrawal amount */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Withdrawal Amount</h3>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">₦</span>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            className={`w-full pl-8 pr-4 py-3 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow ${
              amount && !isValidAmount ? 'border-red-400' : 'border-gray-200'
            }`}
          />
        </div>

        {amount && amountNum < MINIMUM_WITHDRAWAL && (
          <p className="text-xs text-red-500 mt-1">
            Minimum withdrawal is {formatNaira(MINIMUM_WITHDRAWAL)}
          </p>
        )}
        {amount && exceedsBalance && (
          <p className="text-xs text-red-500 mt-1">
            Amount exceeds your wallet balance of {formatNaira(WALLET_BALANCE)}
          </p>
        )}

        <p className="text-xs text-gray-400 mt-2">
          Minimum withdrawal: {formatNaira(MINIMUM_WITHDRAWAL)}
        </p>
      </div>

      {/* Withdrawal summary */}
      {isValidAmount && hasBank && (
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 space-y-3">
          <h3 className="text-sm font-bold text-gray-900">Summary</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Amount</span>
            <span className="font-bold text-gray-900">₦{amount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Bank</span>
            <span className="font-bold text-gray-900">{linkedBank.bankName} · {linkedBank.accountNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Processing time</span>
            <span className="font-bold text-gray-900">Within 24 hours</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Remaining balance</span>
            <span className="font-bold text-emerald-600">
              {formatNaira(WALLET_BALANCE - amountNum)}
            </span>
          </div>
        </div>
      )}

      {/* Confirm button */}
      <button
        onClick={handleWithdraw}
        disabled={isLoading || !isValidAmount || !hasBank}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-mtn-yellow text-black font-bold hover:bg-mtn-yellow-dark transition-all duration-150 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : (
          <>
            Confirm Withdrawal
            <ArrowRight size={16} />
          </>
        )}
      </button>

      {/* Recent withdrawals */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">Recent Withdrawals</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {recentWithdrawals.map(wd => (
            <div key={wd.id} className="px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Banknote size={15} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Withdrawal to {linkedBank.bankName}
                  </p>
                  <p className="text-xs text-gray-400">{wd.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{wd.amount}</p>
                <span className={`text-xs font-semibold ${
                  wd.status === 'Processed'
                    ? 'text-emerald-500'
                    : 'text-orange-500'
                }`}>
                  {wd.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}