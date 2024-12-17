import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  telegramId: number;

  @IsBoolean()
  @IsNotEmpty()
  isAdult: boolean;

  // TODO: вернуть после ресерча (валидация в тлг)
  // @IsEmail()
  // @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  fio: string;

  // TODO: вернуть после ресерча (валидация в тлг)
  // @IsPhoneNumber()
  // @IsNotEmpty()
  @IsString()
  phone: string;
}
