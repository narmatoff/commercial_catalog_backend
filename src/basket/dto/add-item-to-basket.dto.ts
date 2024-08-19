import { IsNumber } from 'class-validator';

export class AddItemToBasketDto {
  @IsNumber()
  telegramId: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}
