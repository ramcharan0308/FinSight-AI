import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1.5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 self-start max-w-[80px]">
      <div
        className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"
        style={{ animationDelay: '0ms' }}
      />
      <div
        className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"
        style={{ animationDelay: '150ms' }}
      />
      <div
        className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"
        style={{ animationDelay: '300ms' }}
      />
    </div>
  );
}
