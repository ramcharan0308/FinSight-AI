'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlyCategorySum } from '@/types';

interface CategoryDonutChartProps {
  data: MonthlyCategorySum[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: MonthlyCategorySum }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0].payload;
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(item.totalSpent);

  return (
    <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 shadow-xl flex items-center gap-2.5 text-xs font-sans">
      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
      <span className="font-bold text-slate-700 dark:text-slate-350">{item.categoryName}</span>
      <span className="font-black text-slate-900 dark:text-white ml-2">{formatted}</span>
    </div>
  );
}

export function CategoryDonutChart({ data }: CategoryDonutChartProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const totalExpenses = data.reduce((acc, curr) => acc + curr.totalSpent, 0);

  if (data.length === 0) {
    return (
      <div className="p-6 rounded-2xl border border-slate-200/65 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between h-[380px]">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
            Category Breakdown
          </h3>
          <p className="text-xs text-slate-500">Expenses distributed by category</p>
        </div>
        <div className="flex-grow flex items-center justify-center text-sm text-slate-400 font-semibold italic">
          No expenses recorded this period
        </div>
      </div>
    );
  }

  // Sort data descending by total spent
  const sortedData = [...data].sort((a, b) => b.totalSpent - a.totalSpent);

  return (
    <div className="p-6 rounded-2xl border border-slate-200/65 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between h-[380px] select-none relative">
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
          Category Distribution
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          Expense allocation details by target area
        </p>
      </div>

      {/* Donut container with central text */}
      <div className="h-44 w-full relative mt-4">
        {/* Centered label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
            TOTAL OUTFLOW
          </span>
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            {formatCurrency(totalExpenses)}
          </span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sortedData}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={74}
              paddingAngle={3}
              dataKey="totalSpent"
              nameKey="categoryName"
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom legends displaying percentages */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-xs font-bold text-slate-500 max-h-16 overflow-y-auto pr-1">
        {sortedData.slice(0, 5).map((item, idx) => {
          const pct = totalExpenses > 0 ? (item.totalSpent / totalExpenses) * 100 : 0;
          return (
            <div
              key={idx}
              className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 px-2.5 py-1 rounded-xl shadow-sm"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-600 dark:text-slate-400 truncate max-w-[80px]">
                {item.categoryName}
              </span>
              <span className="text-slate-400 dark:text-slate-500 font-medium font-sans">
                {pct.toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
