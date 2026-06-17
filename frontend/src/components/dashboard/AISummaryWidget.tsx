'use client';

import React, { useState } from 'react';
import { useAI } from '@/hooks/useAI';
import { Sparkles, Loader2, Lightbulb, AlertOctagon, RefreshCw, BarChart3 } from 'lucide-react';
import { AISummaryResponse } from '@/types';

export function AISummaryWidget() {
  const { generateSummary, isGeneratingSummary } = useAI();
  const [summary, setSummary] = useState<AISummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchSummary = async () => {
    setError(null);
    try {
      const today = new Date();
      const data = await generateSummary({
        month: today.getMonth() + 1,
        year: today.getFullYear(),
      });
      setSummary(data);
    } catch {
      setError('Failed to fetch AI insights. Check your server connection or API credentials.');
    }
  };

  return (
    <div className="p-6 rounded-3xl border border-emerald-500/25 dark:border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.03] to-teal-500/[0.03] dark:from-emerald-950/5 dark:to-teal-950/5 relative overflow-hidden select-none">
      {/* Background ambient glow */}
      <div className="absolute right-0 top-0 w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-sm animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
              AI Expense Analytics & Insights
            </h3>
            <p className="text-xs text-slate-450 dark:text-slate-500 font-medium">
              Consult your personal automated financial advisor
            </p>
          </div>
        </div>

        {!isGeneratingSummary && (
          <button
            onClick={handleFetchSummary}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/15"
          >
            {summary ? (
              <>
                <RefreshCw className="w-3.5 h-3.5" /> Re-evaluate Insights
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" /> Ask AI Advisor
              </>
            )}
          </button>
        )}
      </div>

      {isGeneratingSummary && (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
          <div className="relative">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            <Sparkles className="w-4 h-4 text-teal-400 absolute inset-0 m-auto animate-pulse" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold tracking-wide">
            AI Advisor is scanning ledger streams and evaluating budget limits...
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-xs font-semibold text-rose-800 dark:text-rose-400">
          {error}
        </div>
      )}

      {summary && !isGeneratingSummary && (
        <div className="mt-6 space-y-5 animate-scaleIn">
          {/* Executive summary card */}
          <div className="p-4.5 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/80 backdrop-blur-sm">
            <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed font-medium">
              {summary.overallSummary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Comparative indicators */}
            <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/50 flex items-start gap-3 text-xs">
              <BarChart3 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  Cashflow Insights
                </span>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {summary.monthOverMonthInsights}
                </p>
              </div>
            </div>

            {/* Recommendations segment */}
            <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/50 flex items-start gap-3 text-xs">
              <Lightbulb className="w-4.5 h-4.5 text-teal-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  Savings Advisors
                </span>
                <ul className="list-disc pl-4 text-slate-600 dark:text-slate-400 space-y-1 font-medium leading-relaxed">
                  {summary.savingsRecommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Warning banner */}
          {summary.budgetWarnings.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-500/[0.03] dark:bg-rose-950/10 border border-rose-500/20 dark:border-rose-500/10 flex items-start gap-3 text-xs">
              <AlertOctagon className="w-4.5 h-4.5 text-rose-500 flex-shrink-0 mt-0.5 stroke-[2.2]" />
              <div className="space-y-1.5 w-full">
                <span className="font-black text-rose-800 dark:text-rose-400 uppercase tracking-wider text-[10px]">
                  Budget Excess Warnings
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-350">
                  {summary.budgetWarnings.map((warning, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-white/45 dark:bg-slate-950/20 px-3 py-1.5 rounded-xl border border-rose-500/10"
                    >
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {warning.category}
                      </span>
                      <span className="text-rose-600 dark:text-rose-400 font-bold font-mono">
                        +${warning.overage.toFixed(0)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
