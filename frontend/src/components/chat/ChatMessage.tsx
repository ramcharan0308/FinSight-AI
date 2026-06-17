import React from 'react';
import { ChatMessage as ChatMessageType } from '@/types';
import { Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-3 max-w-[90%] md:max-w-[80%] animate-fadeIn select-none',
        isUser ? 'ml-auto flex-row-reverse' : 'mr-auto',
      )}
    >
      {/* Icon badge */}
      <div
        className={cn(
          'flex items-center justify-center w-8.5 h-8.5 rounded-full flex-shrink-0 border shadow-sm transition-transform duration-300 hover:scale-105',
          isUser
            ? 'bg-slate-900 border-slate-900 dark:bg-white dark:border-white text-white dark:text-slate-900'
            : 'bg-indigo-500/10 border-indigo-500/25 dark:border-indigo-500/20 text-indigo-650 dark:text-indigo-400 animate-pulse',
        )}
      >
        {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
      </div>

      {/* Message content capsule */}
      <div
        className={cn(
          'p-4 rounded-2xl text-xs sm:text-sm leading-relaxed font-sans shadow-sm font-medium transition-all duration-300 break-words overflow-hidden',
          isUser
            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-tr-none hover:shadow-md'
            : 'bg-white/95 dark:bg-slate-900/95 border border-slate-200/60 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 rounded-tl-none hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700',
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
