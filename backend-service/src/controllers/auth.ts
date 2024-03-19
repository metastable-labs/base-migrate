import { AuthService } from '../services/auth';
import { Request, Response } from 'express';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async githubCallback(req: Request, res: Response) {
    try {
      const response = await this.authService.githubCallback(
        req.query.code as string
      );

      res.status(200).json({
        message: 'Authenticated successfully',
        data: response,
      });
    } catch (error) {
      res.status(error.code).json({
        message: error.message,
        statusCode: error.code,
      });
    }
  }
}

export const authControllerInstance = new AuthController(new AuthService());
