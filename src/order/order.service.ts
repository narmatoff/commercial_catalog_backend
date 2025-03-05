import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OrderDto } from './dto/order.dto';
import { plainToInstance } from 'class-transformer';
import { convertXML } from 'simple-xml-to-json';

@Injectable()
export class OrderService {
  private readonly apiKey = '5f4cbfac0eae19.17955050';
  private readonly getOrderUrl = 'https://api.p5s.ru/ds_get_order_data.php';
  private readonly placeOrderUrl = 'https://api.p5s.ru/ds_order.php';

  constructor(private readonly httpService: HttpService) {}

  // TODO дописать и проверить получение заказа
  async getOrder(orderID?: string, ExtOrderID?: string) {
    if (!orderID && !ExtOrderID) {
      throw new HttpException(
        'Необходимо указать хотя бы один идентификатор заказа',
        HttpStatus.BAD_REQUEST,
      );
    }
    const params = new URLSearchParams({
      ApiKey: this.apiKey,
      ...(orderID && { orderID }),
      ...(ExtOrderID && { ExtOrderID }),
    });

    try {
      console.log(`${this.getOrderUrl}?${params.toString()}`);

      const response = await firstValueFrom(
        this.httpService.get(`${this.getOrderUrl}?${params.toString()}`),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Ошибка получения информации о заказе ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // TODO: готово! протестировать с разными параметрами!
  async placeOrder(orderDto: OrderDto) {
    const transformedOrder = plainToInstance(OrderDto, orderDto, {
      enableImplicitConversion: true,
    });
    const params = new URLSearchParams({
      ApiKey: this.apiKey,
      TestMode: String(transformedOrder.TestMode),
      // order: String(transformedOrder.order),
      ExtOrderID: String(transformedOrder.ExtOrderID),
      ExtOrderPaid: String(transformedOrder.ExtOrderPaid),
      ExtDeliveryCost: String(transformedOrder.ExtDeliveryCost),
      dsDelivery: String(transformedOrder.dsDelivery),
      dsFio: transformedOrder.dsFio,
      dsMobPhone: transformedOrder.dsMobPhone,
      dsEmail: transformedOrder.dsEmail,
      ...(transformedOrder.dsCity && { dsCity: transformedOrder.dsCity }),
      ...(transformedOrder.dsPickUpId && {
        dsPickUpId: transformedOrder.dsPickUpId,
      }),
      ...(transformedOrder.ExtDateOfAdded && {
        ExtDateOfAdded: transformedOrder.ExtDateOfAdded.toString(),
      }),
      ...(transformedOrder.dsPostcode && {
        dsPostcode: transformedOrder.dsPostcode,
      }),
      ...(transformedOrder.dsCountry && {
        dsCountry: transformedOrder.dsCountry,
      }),
      ...(transformedOrder.dsArea && { dsArea: transformedOrder.dsArea }),
      ...(transformedOrder.dsStreet && { dsStreet: transformedOrder.dsStreet }),
      ...(transformedOrder.dsHouse && { dsHouse: transformedOrder.dsHouse }),
      ...(transformedOrder.dsFlat && { dsFlat: transformedOrder.dsFlat }),
      ...(transformedOrder.dsDeliveryDate && {
        dsDeliveryDate: transformedOrder.dsDeliveryDate.toString(),
      }),
      ...(transformedOrder.packType && {
        packType: String(transformedOrder.packType),
      }),
      ...(transformedOrder.userComment && {
        userComment: transformedOrder.userComment,
      }),
    });

    params.append('order', orderDto.order);

    try {
      console.log(params);

      const response = await firstValueFrom(
        this.httpService.post(this.placeOrderUrl, params.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }),
      );

      return convertXML(response.data).Result;
    } catch (error) {
      throw new HttpException(
        `Ошибка размещения заказа ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
