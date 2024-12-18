import { IsNumber } from 'class-validator';

export class DeleteItemDto {
  @IsNumber()
  telegramId: number;

  @IsNumber()
  itemId: number;
}
