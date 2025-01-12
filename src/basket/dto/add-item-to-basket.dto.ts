import { IsNumber, IsString } from 'class-validator';

export class AddItemToBasketDto {
  @IsString()
  telegramId: string;

  @IsNumber()
  productId: number;

  @IsNumber()
  productOfferId: number;

  @IsNumber()
  quantity: number;
}
