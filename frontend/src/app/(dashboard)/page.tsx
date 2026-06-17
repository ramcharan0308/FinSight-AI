'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { BudgetProgressList } from '@/components/dashboard/BudgetProgressList';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { AISummaryWidget } from '@/components/dashboard/AISummaryWidget';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useBudgets } from '@/hooks/useBudgets';
import { useTransactions } from '@/hooks/useTransactions';
import { CardSkeleton, ChartSkeleton } from '@/components/shared/LoadingSkeleton';

// Lazy-load heavy chart components (recharts ~200KB) — only loaded when needed
const MonthlyChart = dynamic(
  () =>
    import('@/components/dashboard/MonthlyChart').then((mod) => ({ default: mod.MonthlyChart })),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  },
);

const CategoryDonutChart = dynamic(
  () =>
    import('@/components/dashboard/CategoryDonutChart').then((mod) => ({
      default: mod.CategoryDonutChart,
    })),
  {
    ssr: false,
    loading: () => <CardSkeleton />,
  },
);

export default function DashboardPage() {
  const {
    monthlySummary,
    categoryBreakdowns,
    trends,
    isLoadingSummary,
    isLoadingCategories,
    isLoadingTrends,
  } = useAnalytics();
  const { budgetStatuses, isLoadingStatus } = useBudgets();
  const { transactions, isLoading: isLoadingTx } = useTransactions();

  const getPercentageChange = (thisMonth: number, lastMonth: number) => {
    if (lastMonth === 0) return 0;
    return ((thisMonth - lastMonth) / lastMonth) * 100;
  };

  const incomeChange = monthlySummary
    ? getPercentageChange(monthlySummary.thisMonth.income, monthlySummary.lastMonth.income)
    : undefined;
  const expenseChange = monthlySummary
    ? getPercentageChange(monthlySummary.thisMonth.expense, monthlySummary.lastMonth.expense)
    : undefined;

  const thisMonthSavings = monthlySummary
    ? monthlySummary.thisMonth.income - monthlySummary.thisMonth.expense
    : 0;
  const lastMonthSavings = monthlySummary
    ? monthlySummary.lastMonth.income - monthlySummary.lastMonth.expense
    : 0;
  const savingsChange = getPercentageChange(thisMonthSavings, lastMonthSavings);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Dashboard"
        description="Monitor your financial status, set limits, and consult AI insights."
      />

      {/* Stats cards — render as soon as summary arrives, skeleton otherwise */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoadingSummary ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <StatsCard
              title="Total Income"
              value={monthlySummary?.thisMonth.income || 0}
              type="income"
              change={incomeChange}
            />
            <StatsCard
              title="Total Expenses"
              value={monthlySummary?.thisMonth.expense || 0}
              type="expense"
              change={expenseChange}
            />
            <StatsCard
              title="Net Savings"
              value={thisMonthSavings}
              type="savings"
              change={savingsChange}
            />
          </>
        )}
      </div>

      <AISummaryWidget />

      {/* Charts — lazy loaded, each renders independently */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 min-w-0">
          {isLoadingTrends ? <ChartSkeleton /> : <MonthlyChart data={trends} />}
        </div>
        <div className="min-w-0">
          {isLoadingCategories ? (
            <CardSkeleton />
          ) : (
            <CategoryDonutChart data={categoryBreakdowns} />
          )}
        </div>
      </div>

      {/* Bottom section — each renders as its own data arrives */}
      <div className="grid gap-6 lg:grid-cols-2">
        {isLoadingStatus ? <CardSkeleton /> : <BudgetProgressList statuses={budgetStatuses} />}
        {isLoadingTx ? <CardSkeleton /> : <RecentTransactions transactions={transactions} />}
      </div>
    </div>
  );
}
