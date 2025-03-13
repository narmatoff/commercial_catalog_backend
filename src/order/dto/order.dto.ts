import {
  // IsArray,
  IsBoolean,
  IsDateString,
  // IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import {
  EnumDeliveryOption,
  EnumOrderPaidStatus,
  EnumPackType,
} from '../model/enum';

export class OrderDto {
  @IsNotEmpty()
  @IsBoolean()
  TestMode: boolean;

  @IsNotEmpty()
  @Matches(/^(\d+-\d+-\d+(\.\d+)?)(,\d+-\d+-\d+(\.\d+)?)*$/)
  order: string;

  @IsNotEmpty()
  @IsNumber()
  ExtOrderID: number; // внутренний номер заказа в Вашем интернет-магазине

  @IsNotEmpty()
  @IsEnum(EnumOrderPaidStatus)
  ExtOrderPaid: EnumOrderPaidStatus; // статус оплаты заказа

  @IsNotEmpty()
  @IsNumber()
  ExtDeliveryCost: number; // стоимость доставки

  @IsNotEmpty()
  @IsEnum(EnumDeliveryOption)
  dsDelivery: EnumDeliveryOption; // способ доставки

  @IsNotEmpty()
  @IsString()
  dsFio: string; // ФИО покупателя

  @IsNotEmpty()
  @IsPhoneNumber()
  dsMobPhone: string; // телефон покупателя

  @IsNotEmpty()
  @IsEmail()
  dsEmail: string; // email покупателя

  @IsOptional()
  @IsString()
  dsCity?: string; // название населенного пункта

  @IsOptional()
  @IsNumber()
  dsPickUpId?: number; // идентификатор постомата или ПВЗ

  ///////////////////////////////////////
  // Не обязательные параметры запроса://
  ///////////////////////////////////////

  @IsOptional()
  @IsDateString()
  // @IsISO8601() // только дата без времени
  ExtDateOfAdded?: string; // Дата размещения заказа (формат с временем)

  @IsOptional()
  @IsNumberString()
  @Matches(/^\d{6}$/)
  dsPostcode?: string; // почтовый индекс

  @IsOptional()
  @IsString()
  dsCountry?: string; // страна

  @IsOptional()
  @IsString()
  dsArea?: string; // область

  @IsOptional()
  @IsString()
  dsStreet?: string; // улица

  @IsOptional()
  @IsString()
  dsHouse?: string; // номер дома, строение, корпус

  @IsOptional()
  @IsString()
  dsFlat?: string; // номер квартиры

  @IsOptional()
  @IsString()
  dsDeliveryDate?: string; // пожелания покупателя по дате/времени доставки

  @IsOptional()
  @IsEnum(EnumPackType)
  packType?: EnumPackType; // тип упаковки

  @IsOptional()
  @IsString()
  userComment?: string; // ваш комментарий к заказу
}
