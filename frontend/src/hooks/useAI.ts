import { useMutation } from '@tanstack/react-query';
import { aiService } from '@/services/ai.service';
import { ChatMessage } from '@/types';

export const useAI = () => {
  const summaryMutation = useMutation({
    mutationFn: ({ month, year }: { month: number; year: number }) =>
      aiService.generateSummary(month, year),
  });

  const chatMutation = useMutation({
    mutationFn: ({
      message,
      conversationHistory,
    }: {
      message: string;
      conversationHistory: ChatMessage[];
    }) => aiService.processChat(message, conversationHistory),
  });

  return {
    generateSummary: summaryMutation.mutateAsync,
    isGeneratingSummary: summaryMutation.isPending,
    summaryError: summaryMutation.error,

    sendChatMessage: chatMutation.mutateAsync,
    isSendingMessage: chatMutation.isPending,
    chatError: chatMutation.error,
  };
};
