'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2, Lock, RefreshCw, Edit3, Check, X } from 'lucide-react';

interface PlanRate {
  id: string;
  name: string;
  type: 'fd' | 'savings';
  term: string;
  currentRate: number;
  minAmount: number;
  isActive: boolean;
}

const initialRates: PlanRate[] = [
  { id: 'rate-fd-3m',  name: 'Fixed Deposit 3M',   type: 'fd',      term: '3 Months',  currentRate: 12.50, minAmount: 500,   isActive: true },
  { id: 'rate-fd-6m',  name: 'Fixed Deposit 6M',   type: 'fd',      term: '6 Months',  currentRate: 14.75, minAmount: 500,   isActive: true },
  { id: 'rate-fd-12m', name: 'Fixed Deposit 12M',  type: 'fd',      term: '12 Months', currentRate: 18.50, minAmount: 1000,  isActive: true },
  { id: 'rate-sp-ys',  name: 'Y\'ello Savings',    type: 'savings', term: 'Flexible',  currentRate: 9.50,  minAmount: 50,    isActive: true },
  { id: 'rate-sp-ps',  name: 'Pesewa Susu',        type: 'savings', term: 'Monthly',   currentRate: 11.00, minAmount: 100,   isActive: true },
];

interface EditForm {
  rate: string;
  minAmount: string;
}

export default function PlanRateConfig() {
  const [rates, setRates] = useState<PlanRate[]>(initialRates);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EditForm>();

  const startEdit = (plan: PlanRate) => {
    setEditingId(plan.id);
    reset({ rate: plan.currentRate.toString(), minAmount: plan.minAmount.toString() });
  };

  const cancelEdit = () => { setEditingId(null); reset(); };

  const onSave = async (data: EditForm) => {
    setSaving(true);
    // TODO: Connect to backend /api/admin/plans/:id/rate with { rate, minAmount }
    await new Promise(r => setTimeout(r, 800));
    setRates(prev => prev.map(p => p.id === editingId
      ? { ...p, currentRate: parseFloat(data.rate), minAmount: parseFloat(data.minAmount) }
      : p
    ));
    setSaving(false);
    setEditingId(null);
    toast.success('Interest rate updated successfully', { description: 'New rate applies to all new investments immediately.' });
  };

  const toggleActive = async (id: string) => {
    // TODO: Connect to backend /api/admin/plans/:id/toggle
    setRates(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
    const plan = rates.find(p => p.id === id);
    toast.success(`${plan?.name} ${plan?.isActive ? 'deactivated' : 'activated'}`, { description: 'Changes take effect immediately.' });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-base font-semibold text-gray-900">Interest Rate Configuration</h3>
        <p className="text-sm text-gray-400 mt-0.5">Live rates — changes apply immediately to new investments</p>
      </div>

      <div className="divide-y divide-gray-50">
        {rates.map((plan) => (
          <div key={plan.id} className="px-5 py-3.5">
            {editingId === plan.id ? (
              <form onSubmit={handleSubmit(onSave)}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center ${plan.type === 'fd' ? 'bg-gray-900 text-mtn-yellow' : 'bg-mtn-yellow-light text-mtn-yellow-dark'}`}>
                    {plan.type === 'fd' ? <Lock size={11} /> : <RefreshCw size={11} />}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">{plan.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Rate (% p.a.)</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('rate', { required: true, min: 0.01, max: 30 })}
                      className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-mtn-yellow"
                    />
                    {errors.rate && <p className="text-xs text-red-500 mt-0.5">0.01–30%</p>}
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Min. Amount (GH₵)</label>
                    <input
                      type="number"
                      step="1"
                      {...register('minAmount', { required: true, min: 10 })}
                      className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-mtn-yellow"
                    />
                    {errors.minAmount && <p className="text-xs text-red-500 mt-0.5">Min GH₵ 10</p>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-mtn-yellow text-black text-xs font-bold py-2 rounded-lg hover:bg-mtn-yellow-dark disabled:opacity-60 transition-all duration-150 active:scale-95"
                  >
                    {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                    {saving ? 'Saving...' : 'Save Rate'}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-3 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-all duration-150"
                  >
                    <X size={12} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${plan.type === 'fd' ? 'bg-gray-900 text-mtn-yellow' : 'bg-mtn-yellow-light text-mtn-yellow-dark'}`}>
                    {plan.type === 'fd' ? <Lock size={13} /> : <RefreshCw size={13} />}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{plan.name}</p>
                    <p className="text-xs text-gray-400">{plan.term} · Min GH₵ {plan.minAmount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-base font-bold tabular-nums ${plan.isActive ? 'text-gray-900' : 'text-gray-300'}`}>
                    {plan.currentRate.toFixed(2)}%
                  </span>
                  <button
                    onClick={() => startEdit(plan)}
                    className="p-1.5 rounded-lg text-gray-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150"
                    title="Edit rate"
                  >
                    <Edit3 size={13} />
                  </button>
                  {/* Toggle switch */}
                  <button
                    onClick={() => toggleActive(plan.id)}
                    className={`relative w-9 h-5 rounded-full transition-all duration-200 ${plan.isActive ? 'bg-mtn-yellow' : 'bg-gray-200'}`}
                    title={plan.isActive ? 'Deactivate plan' : 'Activate plan'}
                    role="switch"
                    aria-checked={plan.isActive}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${plan.isActive ? 'left-[18px]' : 'left-0.5'}`} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}