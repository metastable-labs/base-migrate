import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { MigrateService } from '../services/migrate';
import { MigrateTokenDto } from '../dtos/migrate';

export class MigrateController {
  constructor(private readonly migrateService: MigrateService) {}

  async migrateToken(req: Request, res: Response) {
    try {
      const migrateDto = plainToInstance(MigrateTokenDto, req.body);
      const errors = await validate(migrateDto);

      if (errors.length > 0) {
        res.status(400).json({ errors });
      }

      const accessToken = req.headers.authorization;

      const response = await this.migrateService.migrateToken(
        req.body,
        accessToken
      );

      res.status(200).json({
        message: 'Migrated successfully',
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

export const migrateControllerInstance = new MigrateController(
  new MigrateService()
);
