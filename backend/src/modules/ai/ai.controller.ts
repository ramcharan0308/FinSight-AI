import { Request, Response, NextFunction } from 'express';
import { AIService } from './ai.service';
import { sendSuccess } from '../../utils/response';

export class AIController {
  private aiService = new AIService();

  generateSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const { month, year } = req.body;
      const summary = await this.aiService.generateSummary(userId, month, year);
      sendSuccess(res, summary, 200);
    } catch (error) {
      next(error);
    }
  };

  chat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const { message, conversationHistory } = req.body;
      const reply = await this.aiService.processChat(userId, message, conversationHistory);
      sendSuccess(res, reply, 200);
    } catch (error) {
      next(error);
    }
  };
}
