import React, { useState } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2.5 p-4 border-t border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 select-none"
    >
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Ask Finsight: 'Did I go over budget on travel?' or 'List my expenses...'"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs font-semibold"
        />
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className={cn(
          'flex items-center justify-center px-4 rounded-2xl text-white transition-all shadow-md',
          text.trim() && !disabled
            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-650 shadow-emerald-500/10 active:scale-[0.98]'
            : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 shadow-none cursor-not-allowed',
        )}
      >
        {disabled ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
      </button>
    </form>
  );
}
