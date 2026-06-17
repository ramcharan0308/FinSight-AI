'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MonthlyTrendPoint } from '@/types';

interface MonthlyChartProps {
  data: MonthlyTrendPoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; stroke?: string; color?: string; name: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 shadow-xl space-y-2.5 min-w-[200px] text-xs">
      <div className="font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[9px] pb-1 border-b border-slate-100 dark:border-slate-900">
        {formatDate(label || '')}
      </div>
      <div className="space-y-1.5 font-sans">
        {payload.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.stroke || item.color }}
              />
              <span className="font-bold text-slate-600 dark:text-slate-400 capitalize">
                {item.name}
              </span>
            </div>
            <span className="font-extrabold text-slate-900 dark:text-white">
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  const formatYAxis = (val: number) => {
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  const formatDateXAxis = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-200/65 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm relative overflow-hidden select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 font-sans">
            Financial Analytics & Cashflow
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Rolling income vs expense velocity tracking
          </p>
        </div>

        {/* Dynamic Legend */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-slate-600 dark:text-slate-400">Expenses</span>
          </div>
        </div>
      </div>

      <div className="h-72 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              className="stroke-slate-100 dark:stroke-slate-800/40"
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatDateXAxis}
              tickLine={false}
              axisLine={false}
              dy={10}
              className="text-[10px] fill-slate-400 dark:fill-slate-500 font-bold"
            />
            <YAxis
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={false}
              dx={-5}
              className="text-[10px] fill-slate-400 dark:fill-slate-500 font-bold"
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: 'rgba(148, 163, 184, 0.15)',
                strokeWidth: 1.5,
                strokeDasharray: '4 4',
              }}
            />
            <Area
              type="monotone"
              dataKey="income"
              name="income"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorIncome)"
              activeDot={{ r: 5, strokeWidth: 0, fill: '#10B981' }}
            />
            <Area
              type="monotone"
              dataKey="expense"
              name="expense"
              stroke="#EF4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorExpense)"
              activeDot={{ r: 5, strokeWidth: 0, fill: '#EF4444' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
