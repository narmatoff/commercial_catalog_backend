import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  telegramId: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  fio: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}
