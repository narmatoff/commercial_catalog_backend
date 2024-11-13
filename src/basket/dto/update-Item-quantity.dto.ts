import { IsNumber } from 'class-validator';

export class UpdateItemQuantityDto {
  @IsNumber()
  telegramId: number;

  @IsNumber()
  productOfferId: number;

  @IsNumber()
  quantity: number;
}
