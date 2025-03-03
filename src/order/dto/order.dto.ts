import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  EnumDeliveryOption,
  EnumOrderPaidStatus,
  EnumPackType,
} from '../model/enum';

export class OrderItemDto {
  @IsNotEmpty()
  @IsString()
  aID: string; // идентификатор товарного предложения

  @IsNotEmpty()
  @IsNumber()
  qty: number; // количество товара, которое нужно добавить в заказ

  @IsNotEmpty()
  @IsNumber()
  ds_price: number; // розничная цена этой позиции для конечного покупателя
}

export class OrderDto {
  @IsNotEmpty()
  @IsBoolean()
  TestMode: boolean;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  order: OrderItemDto[];

  @IsNotEmpty()
  @IsNumber()
  ExtOrderID: number; // внутренний номер заказа в Вашем интернет-магазине. Должно быть уникальным значением в рамках Вашего интернет-магазина!

  @IsNotEmpty()
  @IsEnum(EnumOrderPaidStatus)
  ExtOrderPaid: EnumOrderPaidStatus; // статус оплаты заказа. Может иметь два значения

  @IsNotEmpty()
  @IsNumber()
  ExtDeliveryCost: number; // число. Стоимость доставки для конечного получателя. Если Вы хотите, чтобы доставка для конечно получателя была бесплатной, нужно поставить значение - 0;

  @IsNotEmpty()
  @IsEnum(EnumDeliveryOption)
  dsDelivery: EnumDeliveryOption; // способ доставки. Целое число.

  @IsNotEmpty()
  @IsString()
  dsFio: string; // ФИО покупателя.

  @IsNotEmpty()
  @IsPhoneNumber()
  dsMobPhone: string; // телефон покупателя.

  @IsNotEmpty()
  @IsEmail()
  dsEmail: string; // email покупателя

  @IsOptional()
  @IsString()
  dsCity?: string; // название населенного пункта. Обязательное поле, если способ доставки Почта РФ

  @IsOptional()
  @IsString()
  dsPickUpId?: string; // идентификатор постомата или ПВЗ СДЭК, почтоматов "Халва". Обязательное, если выбрана доставка СДЭК-ПВЗ, почтоматы "Халва".

  ///////////////////////////////////////
  // Не обязательные параметры запроса://
  ///////////////////////////////////////

  @IsOptional()
  @IsDateString()
  ExtDateOfAdded?: Date; // Дата размещения заказа в Вашем интернет-магазине. Формат: «YYYY-MM-DD HH:MM:SS». Если значение не задано, то присваивается текущая дата.

  @IsOptional()
  @IsString()
  dsPostcode?: string; // почтовый индекс.

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
  dsHouse?: string; // номер дома, строение, корпус.

  @IsOptional()
  @IsString()
  dsFlat?: string; // номер квартиры.

  @IsOptional()
  @IsDateString()
  dsDeliveryDate?: Date; // пожелания покупателя по дате/времени доставки заказа.

  @IsOptional()
  @IsEnum(EnumPackType)
  packType?: EnumPackType; // тип упаковки. Если параметр не указан, используется значение указанное в параметрах клиента на странице Настройки заказа.

  @IsOptional()
  @IsString()
  userComment?: string; // ваш комментарий к заказу. Тут можно указать разнообразные дополнительные сведения. Этот комментарий для нас, мы не печатаем его на бланке заказа и не передаём его в службы доставки. Если указать в значении этого поля слово "тест" (userComment=тест), то заказ будет размещен в нашей системе в статусе "Принят", но не пойдет в дальнейшую обработку. Главное отличие от TestMode=1 в том, что заказ реально размещается.

  // constructor(order: OrderDto) {
  //   this.dsArea = order.dsArea ?? '';
  // }
}
