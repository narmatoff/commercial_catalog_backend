import { IsNumber } from 'class-validator';
import { EnumUpdateType } from '../enum';

export class UpdateItemQuantityDto {
  @IsNumber()
  telegramId: number;

  @IsNumber()
  itemId: number;

  @IsNumber()
  updateType: EnumUpdateType;
}
