import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { MigrateService } from '../services/migrate';
import { MigrateTokenDto } from '../dtos/migrate';

export class MigrateController {
  constructor(private readonly migrateService: MigrateService) {}

  async migrateToken(req: Request, res: Response) {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        return res.status(401).json({
          message: 'Unauthorized',
          statusCode: 401,
        });
      }

      const migrateDto = plainToInstance(MigrateTokenDto, req.body);
      const errors = await validate(migrateDto);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const response = await this.migrateService.migrateToken(
        req.body,
        accessToken
      );

      return res.status(200).json({
        message: 'Migrated successfully',
        data: response,
      });
    } catch (error) {
      console.log("MigrateController -> migrateToken -> error", error)
      return res.status(error?.status || 500).json({
        message: error?.message || 'Internal server error, please try again later.',
        statusCode: error?.status || 500,
      });
    }
  }
}

export const migrateControllerInstance = new MigrateController(
  new MigrateService()
);
