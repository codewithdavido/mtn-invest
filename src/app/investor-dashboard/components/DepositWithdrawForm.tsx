'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2, Smartphone } from 'lucide-react';

interface FormData {
  planId: string;
  amount: string;
  momoPhone: string;
  pin: string;
}

interface Props {
  type: 'deposit' | 'withdraw';
  onClose: () => void;
}

const plans = [
  { id: 'plan-fd-001', label: 'Fixed Deposit — 12 Months (GH₵ 8,500)' },
  { id: 'plan-fd-002', label: 'Fixed Deposit — 6 Months (GH₵ 3,200)' },
  { id: 'plan-sp-001', label: 'Y\'ello Savings Plan (GH₵ 1,840)' },
  { id: 'plan-sp-002', label: 'Pesewa Susu Monthly (GH₵ 620)' },
];

export default function DepositWithdrawForm({ type, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: { momoPhone: '0244-XXX-XXX' }
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    // TODO: Connect to backend /api/transactions/create with { type, planId, amount, momoPhone }
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    toast.success(
      type === 'deposit'
        ? `Deposit of GH₵ ${data.amount} initiated successfully`
        : `Withdrawal of GH₵ ${data.amount} is being processed`,
      { description: 'Transaction reference sent to your MoMo number.' }
    );
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Plan selector */}
      <div>
        <label htmlFor="planId" className="block text-sm font-semibold text-gray-700 mb-1.5">
          {type === 'deposit' ? 'Deposit to Plan' : 'Withdraw from Plan'}
        </label>
        <p className="text-xs text-gray-400 mb-2">Select the investment plan for this transaction.</p>
        <select
          id="planId"
          {...register('planId', { required: 'Please select a plan' })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-transparent transition-all duration-150"
        >
          <option value="">— Select a plan —</option>
          {plans.map(p => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>
        {errors.planId && <p className="text-xs text-red-500 mt-1">{errors.planId.message}</p>}
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-1.5">Amount (GH₵)</label>
        <p className="text-xs text-gray-400 mb-2">
          {type === 'deposit' ? 'Minimum deposit: GH₵ 50' : 'Minimum withdrawal: GH₵ 100. Early exit fees may apply.'}
        </p>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">GH₵</span>
          <input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('amount', {
              required: 'Amount is required',
              min: { value: type === 'deposit' ? 50 : 100, message: `Minimum is GH₵ ${type === 'deposit' ? '50' : '100'}` },
            })}
            className="w-full border border-gray-200 rounded-xl pl-14 pr-4 py-3 text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-transparent transition-all duration-150"
          />
        </div>
        {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>}
      </div>

      {/* MoMo phone */}
      <div>
        <label htmlFor="momoPhone" className="block text-sm font-semibold text-gray-700 mb-1.5">
          <span className="inline-flex items-center gap-1.5"><Smartphone size={14} /> MTN MoMo Number</span>
        </label>
        <p className="text-xs text-gray-400 mb-2">Funds will be debited from or credited to this number.</p>
        <input
          id="momoPhone"
          type="tel"
          placeholder="024X XXX XXXX"
          {...register('momoPhone', {
            required: 'MoMo number is required',
            pattern: { value: /^0[2-9]\d{8}$/, message: 'Enter a valid 10-digit MTN number' },
          })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-transparent transition-all duration-150"
        />
        {errors.momoPhone && <p className="text-xs text-red-500 mt-1">{errors.momoPhone.message}</p>}
      </div>

      {/* MoMo PIN */}
      <div>
        <label htmlFor="pin" className="block text-sm font-semibold text-gray-700 mb-1.5">MoMo PIN</label>
        <p className="text-xs text-gray-400 mb-2">Enter your 4-digit MTN Mobile Money PIN to authorise.</p>
        <input
          id="pin"
          type="password"
          maxLength={4}
          placeholder="••••"
          {...register('pin', {
            required: 'PIN is required',
            minLength: { value: 4, message: 'PIN must be 4 digits' },
            maxLength: { value: 4, message: 'PIN must be 4 digits' },
            pattern: { value: /^\d{4}$/, message: 'PIN must be 4 digits' },
          })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 font-mono tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-mtn-yellow focus:border-transparent transition-all duration-150"
        />
        {errors.pin && <p className="text-xs text-red-500 mt-1">{errors.pin.message}</p>}
      </div>

      {/* Warning for withdrawal */}
      {type === 'withdraw' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <p className="text-xs text-amber-700 font-medium">
            Early withdrawal from Fixed Deposits incurs a 2% exit fee on principal. Savings Plan withdrawals are free.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 border border-gray-200 text-gray-700 text-sm font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all duration-150"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-mtn-yellow text-black text-sm font-bold py-3 rounded-xl hover:bg-mtn-yellow-dark disabled:opacity-70 transition-all duration-150 active:scale-95 flex items-center justify-center gap-2"
          style={{ minWidth: 120 }}
        >
          {loading ? (
            <><Loader2 size={16} className="animate-spin" /> Processing...</>
          ) : (
            type === 'deposit' ? 'Confirm Deposit' : 'Request Withdrawal'
          )}
        </button>
      </div>
    </form>
  );
}