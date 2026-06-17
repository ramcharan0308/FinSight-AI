'use client';

import React, { useState } from 'react';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { ChatInput } from '@/components/chat/ChatInput';
import { useAI } from '@/hooks/useAI';
import { ChatMessage } from '@/types';
import { Sparkles, Terminal } from 'lucide-react';

export default function ChatPage() {
  const { sendChatMessage, isSendingMessage } = useAI();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    'How much did I spend this month?',
    'Am I on track for my groceries budget?',
    'What was my largest expense recently?',
  ]);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = { role: 'user', content };
    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);

    try {
      const response = await sendChatMessage({
        message: content,
        conversationHistory: messages,
      });

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setSuggestedQuestions(response.suggestedQuestions);
    } catch {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content:
          'I encountered an error querying your finance records. Please try again in a moment.',
      };
      setMessages((prev) => [...prev, errorMessage]);
      setSuggestedQuestions([]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] lg:h-[calc(100vh-9rem)] xl:h-[calc(100vh-10rem)] rounded-3xl border border-slate-200/65 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm overflow-hidden select-none animate-fadeIn">
      {/* Dynamic cockpit header */}
      <div className="p-5 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/35 dark:bg-slate-950/20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8.5 h-8.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/15">
            <Terminal className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
              Finsight AI Console
            </h2>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
              Consult transaction aggregates and categories
            </p>
          </div>
        </div>

        {/* Live system state indicator */}
        <span className="text-[9px] font-black text-indigo-650 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-indigo-500/20 animate-pulse">
          <Sparkles className="w-3 h-3 text-indigo-500" /> AI Consultant Online
        </span>
      </div>

      <ChatWindow
        messages={messages}
        suggestedQuestions={suggestedQuestions}
        onQuestionClick={handleSendMessage}
        isProcessing={isSendingMessage}
      />

      <ChatInput onSend={handleSendMessage} disabled={isSendingMessage} />
    </div>
  );
}
