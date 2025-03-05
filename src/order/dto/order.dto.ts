import {
  // IsArray,
  IsBoolean,
  // IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  // ValidateNested,
} from 'class-validator';
// import { Type } from 'class-transformer';
import {
  EnumDeliveryOption,
  EnumOrderPaidStatus,
  EnumPackType,
} from '../model/enum';
// export class OrderItemDto {
//   @IsNotEmpty()
//   @IsString()
//   aID: string; // идентификатор товарного предложения
//
//   @IsNotEmpty()
//   @IsString()
//   qty: string; // количество товара, которое нужно добавить в заказ
//
//   @IsNotEmpty()
//   @IsString()
//   ds_price: string; // розничная цена этой позиции для конечного покупателя
// }

export class OrderDto {
  @IsNotEmpty()
  @IsBoolean()
  TestMode: boolean;

  // @IsNotEmpty()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => OrderItemDto)
  // order: OrderItemDto[];

  @IsNotEmpty()
  @Matches(/^(\d+-\d+-\d+(\.\d+)?)(,\d+-\d+-\d+(\.\d+)?)*$/)
  order: string;

  @IsNotEmpty()
  @IsString()
  ExtOrderID: string; // внутренний номер заказа в Вашем интернет-магазине

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
  @IsString()
  dsPickUpId?: string; // идентификатор постомата или ПВЗ

  ///////////////////////////////////////
  // Не обязательные параметры запроса://
  ///////////////////////////////////////

  @IsOptional()
  @IsString()
  ExtDateOfAdded?: string; // Дата размещения заказа (формат с временем)

  @IsOptional()
  @IsString()
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
