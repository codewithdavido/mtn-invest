'use client';

import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Plus,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Trash2,
  Wallet,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { depositFunds, getTransactions, getUserProfile } from '@/lib/auth';

const quickAmounts = [10000, 20000, 50000, 100000];

const linkedCard = {
  id: 'card-1',
  last4: '4242',
  type: 'Visa',
  expiry: '12/27',
  name: 'Chioma Okafor',
};

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export default function DepositPage() {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [hasCard, setHasCard] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [recentDeposits, setRecentDeposits] = useState<any[]>([]);

  // Load real wallet balance and recent deposits
  useEffect(() => {
    if (user) {
      // Get wallet balance
      getUserProfile(user.uid).then((profile) => {
        setWalletBalance(profile?.walletBalance || 0);
      });

      // Get recent deposits
      getTransactions(user.uid).then((txs) => {
        const deposits = txs.filter((tx: any) => tx.type === 'Deposit');
        setRecentDeposits(deposits);
      });
    }
  }, [user]);

  const amountNum = parseFloat(amount.replace(/,/g, '')) || 0;
  const isValidAmount = amountNum >= 10000;

  const handleQuickAmount = (val: number) => {
    setAmount(val.toLocaleString('en-NG'));
    setErrorMessage('');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const formatted = raw ? parseInt(raw).toLocaleString('en-NG') : '';
    setAmount(formatted);
    setErrorMessage('');
  };

  const handleDeposit = async () => {
    if (!isValidAmount) {
      setErrorMessage('Minimum deposit is ₦10,000');
      return;
    }
    if (!hasCard) {
      setErrorMessage('Please link a card first');
      return;
    }
    if (!user) return;

    setIsLoading(true);
    try {
      await depositFunds(user.uid, amountNum);

      // Refresh balance and transactions
      const profile = await getUserProfile(user.uid);
      setWalletBalance(profile?.walletBalance || 0);

      const txs = await getTransactions(user.uid);
      const deposits = txs.filter((tx: any) => tx.type === 'Deposit');
      setRecentDeposits(deposits);

      setSuccessMessage(`${formatNaira(amountNum)} has been added to your wallet!`);
      setAmount('');
    } catch {
      setErrorMessage('Deposit failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Deposit Funds</h2>
        <p className="text-gray-500 mt-1 text-sm">Add money to your wallet to start investing</p>
      </div>

      {/* Wallet balance — now real! */}
      <div className="bg-gray-900 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">Current Wallet Balance</p>
          <p className="text-3xl font-bold text-white">{formatNaira(walletBalance)}</p>
        </div>
        <div className="w-14 h-14 bg-mtn-yellow rounded-2xl flex items-center justify-center">
          <Wallet size={24} className="text-black" />
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

      {/* Linked card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard size={16} className="text-mtn-yellow-dark" />
          Payment Method
        </h3>

        {hasCard ? (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-mtn-yellow text-xs font-bold">{linkedCard.type}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  •••• •••• •••• {linkedCard.last4}
                </p>
                <p className="text-xs text-gray-400">
                  {linkedCard.name} · Expires {linkedCard.expiry}
                </p>
              </div>
            </div>
            <button
              onClick={() => setHasCard(false)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-150"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setHasCard(true)}
            className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:border-mtn-yellow hover:text-mtn-yellow-dark transition-all duration-150"
          >
            <Plus size={18} />
            Link a Card
          </button>
        )}
      </div>

      {/* Deposit amount */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Deposit Amount</h3>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {quickAmounts.map(val => (
            <button
              key={val}
              onClick={() => handleQuickAmount(val)}
              className={`py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150 ${
                amount === val.toLocaleString('en-NG')
                  ? 'bg-mtn-yellow text-black border-mtn-yellow'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-mtn-yellow hover:text-mtn-yellow-dark'
              }`}
            >
              {formatNaira(val)}
            </button>
          ))}
        </div>

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
        {amount && !isValidAmount && (
          <p className="text-xs text-red-500 mt-1">Minimum deposit is ₦10,000</p>
        )}
        <p className="text-xs text-gray-400 mt-2">Minimum deposit: ₦10,000</p>
      </div>

      {/* Deposit summary */}
      {isValidAmount && hasCard && (
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 space-y-3">
          <h3 className="text-sm font-bold text-gray-900">Summary</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Amount</span>
            <span className="font-bold text-gray-900">₦{amount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Card</span>
            <span className="font-bold text-gray-900">•••• {linkedCard.last4}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">New wallet balance</span>
            <span className="font-bold text-emerald-600">
              {formatNaira(walletBalance + amountNum)}
            </span>
          </div>
        </div>
      )}

      {/* Confirm button */}
      <button
        onClick={handleDeposit}
        disabled={isLoading || !isValidAmount || !hasCard}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-mtn-yellow text-black font-bold hover:bg-mtn-yellow-dark transition-all duration-150 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : (
          <>
            Confirm Deposit
            <ArrowRight size={16} />
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Payments are processed securely via Paystack · PCIDSS compliant
      </p>

      {/* Recent deposits — now real! */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">Recent Deposits</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {recentDeposits.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No deposits yet</p>
          ) : (
            recentDeposits.map((dep: any, index: number) => (
              <div key={index} className="px-6 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <CreditCard size={15} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Card Deposit</p>
                    <p className="text-xs text-gray-400">
                      {new Date(dep.date).toLocaleDateString('en-NG', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{formatNaira(dep.amount)}</p>
                  <span className="text-xs font-semibold text-emerald-500">{dep.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}