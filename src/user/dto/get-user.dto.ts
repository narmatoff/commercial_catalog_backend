import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
