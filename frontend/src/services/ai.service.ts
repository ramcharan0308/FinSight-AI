import { apiClient } from '@/lib/axios';
import { AISummaryResponse, ChatResponse, ChatMessage } from '@/types';

export const aiService = {
  async generateSummary(month: number, year: number): Promise<AISummaryResponse> {
    const response = await apiClient.post('/ai/summary', { month, year });
    return response.data.data;
  },

  async processChat(message: string, conversationHistory: ChatMessage[]): Promise<ChatResponse> {
    const response = await apiClient.post('/ai/chat', { message, conversationHistory });
    return response.data.data;
  },
};
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const getCategoriesService = {
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get('/categories');
    return response.data.data;
  },
};
