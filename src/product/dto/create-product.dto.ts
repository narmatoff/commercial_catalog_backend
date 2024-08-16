import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content?: string;

  @IsEmail()
  authorEmail: string;

  @IsUrl()
  imageUrl?: string;
}
