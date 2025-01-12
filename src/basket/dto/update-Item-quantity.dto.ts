import { IsNumber, IsString } from 'class-validator';
import { EnumUpdateType } from '../enum';

export class UpdateItemQuantityDto {
  @IsString()
  telegramId: string;

  @IsNumber()
  itemId: number;

  @IsNumber()
  updateType: EnumUpdateType;
}
