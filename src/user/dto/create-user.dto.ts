import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  telegramId: string;

  @IsBoolean()
  @IsNotEmpty()
  isAdult: boolean;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  fio: string;

  @IsString()
  @IsOptional()
  phone: string;
}
