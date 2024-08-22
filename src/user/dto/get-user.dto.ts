import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class GetUserDto {
  @IsNumber()
  @IsNotEmpty()
  telegramId: number;
}
