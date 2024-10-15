import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  telegramId: number;

  @IsBoolean()
  @IsNotEmpty()
  isAdult: boolean;
}
