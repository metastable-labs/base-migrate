import {
  IsUUID,
  IsOptional,
  IsString,
  IsIn,
  IsNotEmpty,
  IsUrl,
  IsObject,
} from 'class-validator';
import { Token } from '../common/interfaces/index.interface';

export class MigrateTokenDto {
  @IsNotEmpty()
  @IsUrl()
  logoUrl?: string;

  @IsNotEmpty()
  @IsObject()
  tokenData: Token;
}
