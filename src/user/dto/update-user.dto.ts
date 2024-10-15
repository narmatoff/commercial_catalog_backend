import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  // TODO: вернуть после ресерча (валидация в тлг)
  // @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  fio: string;

  // TODO: вернуть после ресерча (валидация в тлг)
  // @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}
