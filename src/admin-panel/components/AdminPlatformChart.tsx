'use client';
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

const monthlyVolume = [
  { month: 'Oct \'25', deposits: 4820000, withdrawals: 1200000 },
  { month: 'Nov \'25', deposits: 5100000, withdrawals: 980000 },
  { month: 'Dec \'25', deposits: 6400000, withdrawals: 1500000 },
  { month: 'Jan \'26', deposits: 5800000, withdrawals: 1800000 },
  { month: 'Feb \'26', deposits: 6200000, withdrawals: 1400000 },
  { month: 'Mar \'26', deposits: 7100000, withdrawals: 2100000 },
  { month: 'Apr \'26', deposits: 3900000, withdrawals: 900000 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-card-hover text-xs">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={`bar-tip-${i}`} className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-gray-500">{p.name}</span>
          </div>
          <span className="font-bold text-gray-900 tabular-nums">GH₵ {(p.value / 1000000).toFixed(2)}M</span>
        </div>
      ))}
    </div>
  );
};

export default function AdminPlatformChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-900">Monthly Transaction Volume</h3>
        <p className="text-sm text-gray-400 mt-0.5">Deposits vs withdrawals — platform-wide (GH₵)</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={monthlyVolume} margin={{ top: 5, right: 5, left: 0, bottom: 5 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `₵${(v / 1000000).toFixed(1)}M`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
            formatter={(value) => <span className="text-gray-500">{value}</span>}
          />
          <Bar dataKey="deposits" name="Deposits" fill="#FFCC00" radius={[4, 4, 0, 0]} maxBarSize={32} />
          <Bar dataKey="withdrawals" name="Withdrawals" fill="#E5E7EB" radius={[4, 4, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}