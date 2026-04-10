'use client';
import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, defs, linearGradient, stop
} from 'recharts';

const monthlyData = [
  { month: 'Apr \'25', balance: 8200,  interest: 68 },
  { month: 'May \'25', balance: 8780,  interest: 75 },
  { month: 'Jun \'25', balance: 9150,  interest: 82 },
  { month: 'Jul \'25', balance: 9320,  interest: 80 },
  { month: 'Aug \'25', balance: 10200, interest: 95 },
  { month: 'Sep \'25', balance: 10850, interest: 103 },
  { month: 'Oct \'25', balance: 11400, interest: 112 },
  { month: 'Nov \'25', balance: 11200, interest: 98 },
  { month: 'Dec \'25', balance: 12100, interest: 130 },
  { month: 'Jan \'26', balance: 12780, interest: 142 },
  { month: 'Feb \'26', balance: 13540, interest: 155 },
  { month: 'Mar \'26', balance: 13910, interest: 162 },
  { month: 'Apr \'26', balance: 14160, interest: 243 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-card-hover text-xs">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={`tip-${i}`} className="flex items-center justify-between gap-6">
          <span className="text-gray-500">{p.dataKey === 'balance' ? 'Portfolio Value' : 'Interest Earned'}</span>
          <span className="font-bold text-gray-900 tabular-nums">GH₵ {p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

type Range = '3M' | '6M' | '1Y';

export default function PortfolioChart() {
  const [range, setRange] = useState<Range>('1Y');

  const rangeMap: Record<Range, number> = { '3M': 3, '6M': 6, '1Y': 13 };
  const displayData = monthlyData.slice(-rangeMap[range]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-card transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Portfolio Growth</h3>
          <p className="text-sm text-gray-400 mt-0.5">Balance trend over time</p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          {(['3M', '6M', '1Y'] as Range[]).map(r => (
            <button
              key={`range-${r}`}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${range === r ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={displayData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFCC00" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FFCC00" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="interestGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `₵${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="balance" stroke="#FFCC00" strokeWidth={2.5} fill="url(#balanceGrad)" dot={false} activeDot={{ r: 5, fill: '#FFCC00', stroke: '#fff', strokeWidth: 2 }} />
          <Area type="monotone" dataKey="interest" stroke="#10B981" strokeWidth={2} fill="url(#interestGrad)" dot={false} activeDot={{ r: 4, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
        {[
          { id: 'leg-balance',  color: 'bg-mtn-yellow', label: 'Portfolio Balance' },
          { id: 'leg-interest', color: 'bg-emerald-500', label: 'Monthly Interest' },
        ].map(l => (
          <div key={l.id} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${l.color}`} />
            <span className="text-xs text-gray-500">{l.label}</span>
          </div>
        ))}
        <p className="ml-auto text-xs text-gray-400">Last updated: 7 Apr 2026, 20:27</p>
      </div>
    </div>
  );
}