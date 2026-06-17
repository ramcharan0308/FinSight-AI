import OpenAI from 'openai';
import { AIRepository } from './ai.repository';
import { SYSTEM_PROMPT, SUMMARY_PROMPT_TEMPLATE, CHAT_PROMPT_TEMPLATE } from './prompts';
import { SummaryResponse, ChatResponse, ChatMessage } from './ai.types';
import { CustomError } from '../../middlewares/error.middleware';

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export class AIService {
  private aiRepository = new AIRepository();

  private getClient(): OpenAI {
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
      throw new CustomError(
        'Groq API Key is not configured. Please supply a valid GROQ_API_KEY environment variable.',
        500,
        'AI_CONFIGURATION_ERROR',
      );
    }
    return client;
  }

  async generateSummary(userId: string, month: number, year: number): Promise<SummaryResponse> {
    const client = this.getClient();

    // 1. Fetch current month data
    const currentTx = await this.aiRepository.getTransactionsForMonth(userId, year, month);
    const budgets = await this.aiRepository.getBudgetsForUser(userId);

    // 2. Fetch previous month comparative data
    const prevYear = month === 1 ? year - 1 : year;
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevTx = await this.aiRepository.getTransactionsForMonth(userId, prevYear, prevMonth);

    // 3. Compact transactions context to optimize token usage
    const currentTxContext = currentTx.map((t) => ({
      amount: Number(t.amount),
      type: t.type,
      category: t.category.name,
      description: t.description || undefined,
      date: t.date.toISOString().split('T')[0],
    }));

    const prevTxContext = prevTx.map((t) => ({
      amount: Number(t.amount),
      type: t.type,
      category: t.category.name,
      date: t.date.toISOString().split('T')[0],
    }));

    const budgetsContext = budgets.map((b) => ({
      category: b.category.name,
      limit: Number(b.amount),
    }));

    // 4. Inject variables into Prompt Template
    let prompt = SUMMARY_PROMPT_TEMPLATE.replace('{{month}}', String(month))
      .replace('{{year}}', String(year))
      .replace('{{currentTransactions}}', JSON.stringify(currentTxContext))
      .replace('{{currentBudgets}}', JSON.stringify(budgetsContext))
      .replace('{{previousTransactions}}', JSON.stringify(prevTxContext));

    try {
      // 5. Query GPT-4o-mini via OpenAI SDK v4
      const response = await client.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.2, // Low temp for structured mathematical reasoning consistency
      });

      const rawJson = response.choices[0].message.content;
      if (!rawJson) {
        throw new CustomError('Empty response received from Groq', 502, 'AI_GATEWAY_ERROR');
      }

      return JSON.parse(rawJson) as SummaryResponse;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.error('AI summary processing exception:', error);
      throw new CustomError(
        'Failed to compile transaction patterns via AI',
        502,
        'AI_SERVICE_ERROR',
        error,
      );
    }
  }

  async processChat(
    userId: string,
    message: string,
    history: ChatMessage[],
  ): Promise<ChatResponse> {
    const client = this.getClient();

    // 1. Fetch past 3 months of transaction ledger items and budgets
    const threeMonthTx = await this.aiRepository.getThreeMonthTransactions(userId);
    const budgets = await this.aiRepository.getBudgetsForUser(userId);

    // 2. Compact datasets to minimize token size
    const txContext = threeMonthTx.map((t) => ({
      date: t.date.toISOString().split('T')[0],
      amount: Number(t.amount),
      type: t.type,
      category: t.category.name,
      description: t.description || undefined,
    }));

    const budgetContext = budgets.map((b) => ({
      category: b.category.name,
      limit: Number(b.amount),
    }));

    // 3. Populate Chat Template Contexts
    const prompt = CHAT_PROMPT_TEMPLATE.replace(
      '{{transactionContext}}',
      JSON.stringify(txContext),
    ).replace('{{budgetContext}}', JSON.stringify(budgetContext));

    // 4. Truncate conversation history to max 10 turns (5 full loops)
    // Slicing from the end of the history array to keep recent logs
    const maxHistoryTurns = 10;
    const truncatedHistory = history.slice(-maxHistoryTurns);

    // Compile message arrays for completions API
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: prompt },
      ...truncatedHistory.map(
        (h) =>
          ({
            role: h.role,
            content: h.content,
          }) as OpenAI.Chat.ChatCompletionMessageParam,
      ),
      { role: 'user', content: message },
    ];

    try {
      // 5. Dispatch payload to LLM model
      const response = await client.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages,
        response_format: { type: 'json_object' },
        temperature: 0.4,
      });

      const rawJson = response.choices[0].message.content;
      if (!rawJson) {
        throw new CustomError('Empty response received from Groq', 502, 'AI_GATEWAY_ERROR');
      }

      return JSON.parse(rawJson) as ChatResponse;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.error('AI chat processing exception:', error);
      throw new CustomError('Failed to formulate chat answer via AI', 502, 'AI_SERVICE_ERROR');
    }
  }
}
