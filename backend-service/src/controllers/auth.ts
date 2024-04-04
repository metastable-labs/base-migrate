import { AuthService } from '../services/auth';
import { Request, Response } from 'express';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async githubAuth(req: Request, res: Response) {
    try {
      const code = req.query.code as string;

      if (!code) {
        return res.status(400).json({
          message: 'Code not found',
          statusCode: 400,
        });
      }

      const response = await this.authService.githubAuth(code);

      return res.status(200).json({
        message: 'Authenticated successfully',
        data: response,
      });
    } catch (error) {
      console.log('AuthController -> githubAuth -> error', error);
      return res.status(error?.status || 500).json({
        message:
          error?.message || 'Internal server error, please try again later.',
        statusCode: error?.status || 500,
      });
    }
  }

  async getSession(req: Request, res: Response) {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        return res.status(401).json({
          message: 'Unauthorized',
          statusCode: 401,
        });
      }

      const response = await this.authService.getSession(accessToken);

      return res.status(200).json({
        message: 'Session retrieved successfully',
        data: response,
      });
    } catch (error) {
      console.log('AuthController -> getSession -> error', error);
      return res.status(error?.status || 500).json({
        message:
          error?.message || 'Internal server error, please try again later.',
        statusCode: error?.status || 500,
      });
    }
  }
  async getPermissions(req: Request, res: Response) {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        return res.status(401).json({
          message: 'Unauthorized',
          statusCode: 401,
        });
      }

      const response = await this.authService.getPermissions(accessToken);

      return res.status(200).json({
        message: 'Permissions retrieved successfully',
        data: response,
      });
    } catch (error) {
      console.log('AuthController -> getPermissions -> error', error);
      return res.status(error?.status || 500).json({
        message:
          error?.message || 'Internal server error, please try again later.',
        statusCode: error?.status || 500,
      });
    }
  }

  async disconnect(req: Request, res: Response) {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        return res.status(401).json({
          message: 'Unauthorized',
          statusCode: 401,
        });
      }

      await this.authService.disconnect(accessToken);

      return res.status(200).json({
        message: 'Disconnected successfully',
      });
    } catch (error) {
      console.log('AuthController -> disconnect -> error', error);
      return res.status(error?.status || 500).json({
        message:
          error?.message || 'Internal server error, please try again later.',
        statusCode: error?.status || 500,
      });
    }
  }
}

export const authControllerInstance = new AuthController(new AuthService());
