import { IsNumber } from 'class-validator';

export class UpdateItemQuantityDto {
  @IsNumber()
  telegramId: number;

  @IsNumber()
  itemId: number;

  @IsNumber()
  quantity: number;
}
