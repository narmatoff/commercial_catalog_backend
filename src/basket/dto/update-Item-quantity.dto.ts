import { IsNumber } from 'class-validator';
import { EnumUpdateType } from '../enum';

export class UpdateItemQuantityDto {
  @IsNumber()
  telegramId: string;

  @IsNumber()
  itemId: number;

  @IsNumber()
  updateType: EnumUpdateType;
}
