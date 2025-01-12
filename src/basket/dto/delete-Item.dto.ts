import { IsNumber, IsString } from 'class-validator';

export class DeleteItemDto {
  @IsString()
  telegramId: string;

  @IsNumber()
  itemId: number;
}
