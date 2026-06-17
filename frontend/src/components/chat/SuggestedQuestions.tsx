import React from 'react';
import { HelpCircle } from 'lucide-react';

interface SuggestedQuestionsProps {
  questions: string[];
  onClick: (question: string) => void;
}

export function SuggestedQuestions({ questions, onClick }: SuggestedQuestionsProps) {
  if (questions.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 pt-3 pl-11 select-none animate-fadeIn">
      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1 flex items-center gap-1.5">
        <HelpCircle className="w-3.5 h-3.5" /> Suggested Queries
      </span>

      <div className="flex flex-wrap gap-2">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onClick(q)}
            className="px-3.5 py-2 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm hover:border-indigo-500/30 hover:bg-indigo-500/[0.03] text-xs text-slate-600 dark:text-slate-450 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-left shadow-sm active:scale-[0.98] transition-all duration-200"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
