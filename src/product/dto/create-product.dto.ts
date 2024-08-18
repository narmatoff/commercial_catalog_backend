import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  prodId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  vendorCode: string;

  @IsNotEmpty()
  @IsNumber()
  vendorId: number;

  @IsNotEmpty()
  @IsNumber()
  infoPrice: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  batteries: string;

  @IsNotEmpty()
  @IsString()
  pack: string;

  @IsNotEmpty()
  @IsString()
  material: string;

  @IsNotEmpty()
  @IsNumber()
  length: number;

  @IsNotEmpty()
  @IsNumber()
  diameter: number;

  @IsOptional()
  @IsString()
  collection: string;

  @IsNotEmpty()
  @IsUrl()
  img1: string;

  @IsOptional()
  @IsUrl()
  img2: string;

  @IsOptional()
  @IsUrl()
  img3: string;

  @IsOptional()
  @IsUrl()
  img4: string;

  @IsOptional()
  @IsUrl()
  img5: string;

  @IsOptional()
  @IsUrl()
  img6: string;

  @IsOptional()
  @IsUrl()
  img7: string;

  @IsOptional()
  @IsUrl()
  img8: string;

  @IsOptional()
  @IsUrl()
  img9: string;

  @IsOptional()
  @IsUrl()
  img10: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsBoolean()
  isNew: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isBestseller: boolean;

  @IsOptional()
  @IsString()
  function: string;

  @IsOptional()
  @IsString()
  addFunction: string;

  @IsOptional()
  @IsString()
  vibration: string;

  @IsOptional()
  @IsString()
  volume: string;

  @IsOptional()
  @IsNumber()
  modelYear: number;

  @IsNotEmpty()
  @IsBoolean()
  imgStatus: boolean;
}
