import { IsNumber } from 'class-validator';

export class UpdateItemQuantityDto {
  @IsNumber()
  telegramId: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}
