import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  fio: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}
