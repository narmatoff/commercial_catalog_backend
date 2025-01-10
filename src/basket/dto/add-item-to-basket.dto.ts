import { IsNumber } from 'class-validator';

export class AddItemToBasketDto {
  @IsNumber()
  telegramId: string;

  @IsNumber()
  productId: number;

  @IsNumber()
  productOfferId: number;

  @IsNumber()
  quantity: number;
}
