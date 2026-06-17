import React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800', className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center space-x-4 py-4 px-6 border-b border-slate-100 dark:border-slate-800">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-4 w-12" />
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 h-[350px] flex flex-col justify-between">
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-3 w-1/6" />
      </div>
      <div className="flex items-end gap-2 h-48 px-4">
        <Skeleton className="h-[20%] flex-1" />
        <Skeleton className="h-[60%] flex-1" />
        <Skeleton className="h-[40%] flex-1" />
        <Skeleton className="h-[80%] flex-1" />
        <Skeleton className="h-[50%] flex-1" />
        <Skeleton className="h-[90%] flex-1" />
      </div>
      <div className="flex justify-between px-2">
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-8" />
      </div>
    </div>
  );
}
