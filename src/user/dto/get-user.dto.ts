import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetUserDto {
  @IsNumber()
  @IsNotEmpty()
  telegramId: string;
}
