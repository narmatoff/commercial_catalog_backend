import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  telegramId: string;

  @IsBoolean()
  @IsNotEmpty()
  isAdult: boolean;

  // TODO: вернуть после ресерча (валидация в тлг)
  // @IsEmail()
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  fio: string;

  // TODO: вернуть после ресерча (валидация в тлг)
  // @IsPhoneNumber()
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  phone: string;
}
