'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, CheckCircle2, ArrowRight, Info, Wallet } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { createInvestment, getUserProfile } from '@/lib/auth';

const tiers = [
  {
    id: 'tier-basic',
    name: 'Basic',
    shares: 4,
    investment: 35600,
    monthlyReturn: 5340,
    highlight: false,
    badge: null,
  },
  {
    id: 'tier-standard',
    name: 'Standard',
    shares: 10,
    investment: 89000,
    monthlyReturn: 13350,
    highlight: true,
    badge: 'Most Popular',
  },
  {
    id: 'tier-premium',
    name: 'Premium',
    shares: 20,
    investment: 178000,
    monthlyReturn: 26700,
    highlight: false,
    badge: null,
  },
  {
    id: 'tier-elite',
    name: 'Elite',
    shares: 50,
    investment: 445000,
    monthlyReturn: 66750,
    highlight: false,
    badge: 'Best Returns',
  },
];

const SHARE_PRICE = 8900;
const MIN_SHARES = 4;
const RETURN_RATE = 0.15;

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export default function InvestPage() {
  const { user } = useAuth();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [customShares, setCustomShares] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);

  // Load real wallet balance
  useEffect(() => {
    if (user) {
      getUserProfile(user.uid).then((profile) => {
        setWalletBalance(profile?.walletBalance || 0);
      });
    }
  }, [user]);

  const customSharesNum = parseInt(customShares) || 0;
  const customInvestment = customSharesNum * SHARE_PRICE;
  const customMonthlyReturn = Math.round(customInvestment * RETURN_RATE);
  const isCustomValid = customSharesNum >= MIN_SHARES;

  const selectedTierData = tiers.find(t => t.id === selectedTier);

  const handleCustomSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomShares(val);
    setSelectedTier(null);
    setUseCustom(true);
    setErrorMessage('');
  };

  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId);
    setUseCustom(false);
    setCustomShares('');
    setErrorMessage('');
  };

  const getInvestmentSummary = () => {
    if (useCustom && isCustomValid) {
      return {
        shares: customSharesNum,
        investment: customInvestment,
        monthlyReturn: customMonthlyReturn,
        planName: 'Custom',
      };
    }
    if (selectedTierData) {
      return {
        shares: selectedTierData.shares,
        investment: selectedTierData.investment,
        monthlyReturn: selectedTierData.monthlyReturn,
        planName: selectedTierData.name,
      };
    }
    return null;
  };

  const summary = getInvestmentSummary();

  const handleConfirm = async () => {
    if (!summary || !user) return;

    // Check if user has enough balance
    if (walletBalance < summary.investment) {
      setErrorMessage(`Insufficient balance. You need ${formatNaira(summary.investment)} but have ${formatNaira(walletBalance)}.`);
      return;
    }

    setIsLoading(true);
    try {
      await createInvestment(
        user.uid,
        summary.shares,
        summary.investment,
        summary.monthlyReturn,
        summary.planName,
      );

      // Refresh wallet balance
      const profile = await getUserProfile(user.uid);
      setWalletBalance(profile?.walletBalance || 0);

      setConfirmed(true);
    } catch (error: any) {
      setErrorMessage(error.message || 'Investment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (confirmed && summary) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Investment Confirmed!</h2>
        <p className="text-gray-500 mb-6">
          You have successfully invested {formatNaira(summary.investment)} ({summary.shares} shares).
          Your first monthly return of {formatNaira(summary.monthlyReturn)} will be credited on the 1st of next month.
        </p>
        <div className="bg-gray-50 rounded-2xl p-5 mb-6 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shares purchased</span>
            <span className="font-bold text-gray-900">{summary.shares} shares</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Amount invested</span>
            <span className="font-bold text-gray-900">{formatNaira(summary.investment)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Monthly return</span>
            <span className="font-bold text-emerald-600">{formatNaira(summary.monthlyReturn)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Remaining balance</span>
            <span className="font-bold text-gray-900">{formatNaira(walletBalance)}</span>
          </div>
        </div>
        <button
          onClick={() => {
            setConfirmed(false);
            setSelectedTier(null);
            setCustomShares('');
            setUseCustom(false);
            setErrorMessage('');
          }}
          className="w-full py-3 rounded-xl bg-mtn-yellow text-black font-bold hover:bg-mtn-yellow-dark transition-all duration-150"
        >
          Invest Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Choose an Investment Plan</h2>
        <p className="text-gray-500 mt-1 text-sm">
          1 share = {formatNaira(SHARE_PRICE)} · Minimum 4 shares · Monthly return = 15% of investment
        </p>
      </div>

      {/* Wallet balance */}
      <div className="flex items-center gap-3 bg-gray-900 rounded-2xl p-4">
        <div className="w-10 h-10 bg-mtn-yellow rounded-xl flex items-center justify-center shrink-0">
          <Wallet size={18} className="text-black" />
        </div>
        <div>
          <p className="text-xs text-gray-400">Available wallet balance</p>
          <p className="text-lg font-bold text-white">{formatNaira(walletBalance)}</p>
        </div>
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Your capital is permanently locked in once invested. You will receive 15% of your investment as a monthly return every 1st of the month, directly to your wallet.
        </p>
      </div>

      {/* Tier cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {tiers.map((tier) => {
          const isSelected = selectedTier === tier.id;
          const canAfford = walletBalance >= tier.investment;
          return (
            <button
              key={tier.id}
              onClick={() => canAfford && handleTierSelect(tier.id)}
              className={`
                relative text-left rounded-2xl p-5 border-2 transition-all duration-200
                ${isSelected
                  ? 'border-mtn-yellow bg-gray-900 text-white shadow-lg scale-[1.02]'
                  : canAfford
                    ? 'border-gray-200 bg-white hover:border-mtn-yellow/50'
                    : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                }
              `}
            >
              {tier.badge && (
                <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${
                  isSelected ? 'bg-mtn-yellow text-black' : 'bg-mtn-yellow/20 text-mtn-yellow-dark'
                }`}>
                  {tier.badge}
                </span>
              )}

              <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
                isSelected ? 'text-mtn-yellow' : 'text-mtn-yellow-dark'
              }`}>
                {tier.name}
              </p>

              <p className={`text-3xl font-black mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                {tier.shares}
                <span className="text-base font-medium ml-1">shares</span>
              </p>

              <p className={`text-sm font-semibold mb-4 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                {formatNaira(tier.investment)}
              </p>

              <div className={`rounded-xl p-3 ${isSelected ? 'bg-white/10' : 'bg-gray-50'}`}>
                <p className="text-xs text-gray-400 mb-1">Monthly return</p>
                <p className={`text-lg font-bold ${isSelected ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  {formatNaira(tier.monthlyReturn)}
                </p>
              </div>

              {isSelected && (
                <div className="mt-3 flex items-center gap-2 text-mtn-yellow text-xs font-semibold">
                  <CheckCircle2 size={14} />
                  Selected
                </div>
              )}

              {!canAfford && (
                <p className="mt-3 text-xs text-red-400 font-semibold">Insufficient balance</p>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom shares */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-1">Custom Investment</h3>
        <p className="text-xs text-gray-400 mb-4">Enter any number of shares (minimum 4)</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Number of shares</label>
            <input
              type="text"
              value={customShares}
              onChange={handleCustomSharesChange}
              placeholder="e.g. 7"
              className={`w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-mtn-yellow ${
                customShares && !isCustomValid ? 'border-red-400' : 'border-gray-200'
              }`}
            />
            {customShares && !isCustomValid && (
              <p className="text-xs text-red-500 mt-1">Minimum 4 shares required</p>
            )}
          </div>

          {customShares && isCustomValid && (
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Investment</p>
                <p className="text-sm font-bold text-gray-900">{formatNaira(customInvestment)}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Monthly return</p>
                <p className="text-sm font-bold text-emerald-600">{formatNaira(customMonthlyReturn)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Investment summary + confirm */}
      {summary && (
        <div className="bg-gray-900 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-mtn-yellow" />
            Investment Summary
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Shares</span>
              <span className="font-bold text-white">{summary.shares} shares</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total investment</span>
              <span className="font-bold text-white">{formatNaira(summary.investment)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Monthly return (15%)</span>
              <span className="font-bold text-emerald-400">{formatNaira(summary.monthlyReturn)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Remaining balance</span>
              <span className="font-bold text-white">{formatNaira(walletBalance - summary.investment)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Capital lock-in</span>
              <span className="font-bold text-orange-400">Permanent</span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-mtn-yellow text-black font-bold hover:bg-mtn-yellow-dark transition-all duration-150 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : (
              <>
                Confirm Investment
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            By confirming, you agree that your capital is permanently locked in.
          </p>
        </div>
      )}
    </div>
  );
}