import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { sendSuccess } from '../../utils/response';

export class AuthController {
  private authService = new AuthService();

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const response = await this.authService.register(req.body);
      sendSuccess(res, response, 201);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const response = await this.authService.login(req.body);
      sendSuccess(res, response, 200);
    } catch (error) {
      next(error);
    }
  };
}
