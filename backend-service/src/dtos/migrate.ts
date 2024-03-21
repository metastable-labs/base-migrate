import { IsNotEmpty, IsUrl, IsObject, IsEnum } from 'class-validator';
import { Token } from '../common/interfaces/index.interface';
import { CHAIN_ID } from '../common/enums';

export class MigrateTokenDto {
  @IsNotEmpty()
  @IsEnum(CHAIN_ID)
  chainId: CHAIN_ID;

  @IsNotEmpty()
  @IsUrl()
  logoUrl: string;

  @IsNotEmpty()
  @IsObject({ each: true })
  tokenData: Token;
}
