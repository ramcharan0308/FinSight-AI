'use client';

import React, { useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType } from '@/types';
import { ChatMessage } from './ChatMessage';
import { SuggestedQuestions } from './SuggestedQuestions';
import { TypingIndicator } from './TypingIndicator';
import { Sparkles } from 'lucide-react';

interface ChatWindowProps {
  messages: ChatMessageType[];
  suggestedQuestions: string[];
  onQuestionClick: (question: string) => void;
  isProcessing: boolean;
}

export function ChatWindow({
  messages,
  suggestedQuestions,
  onQuestionClick,
  isProcessing,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 min-h-0">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center h-full py-12">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 mb-4">
            <Sparkles className="w-6 h-6 text-emerald-500 animate-pulse" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans mb-2">
            Ask Finsight AI Advisor
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
            Consult your budget status, track specific items, or ask: *&quot;Did I go over budget on
            dining out?&quot;*
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((m, idx) => (
            <ChatMessage key={idx} message={m} />
          ))}
          {isProcessing && <TypingIndicator />}
          {!isProcessing && messages[messages.length - 1]?.role === 'assistant' && (
            <SuggestedQuestions questions={suggestedQuestions} onClick={onQuestionClick} />
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
