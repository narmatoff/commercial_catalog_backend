import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OrderDto } from './dto/order.dto';
import { plainToInstance } from 'class-transformer';
import { convertXML } from 'simple-xml-to-json';
import { ServerResponse } from './type/server-response';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getOrder(orderID?: string, ExtOrderID?: string) {
    const dsApiKey = this.configService.get<string>('DS_API_KEY');
    const getDsOrderUrl = this.configService.get<string>('DS_GET_ORDER_DATA');

    if (!orderID && !ExtOrderID) {
      throw new HttpException(
        'Необходимо указать хотя бы один идентификатор заказа',
        HttpStatus.BAD_REQUEST,
      );
    }
    const params = new URLSearchParams({
      ApiKey: dsApiKey,
      ...(orderID && { orderID }),
      ...(ExtOrderID && { ExtOrderID }),
    });

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${getDsOrderUrl}?${params.toString()}`),
      );

      return convertXML(response.data);
    } catch (error) {
      throw new HttpException(
        `Ошибка получения информации о заказе ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // TODO: готово! протестировать с разными параметрами!
  async placeOrder(orderDto: OrderDto) {
    const dsApiKey = this.configService.get<string>('DS_API_KEY');
    const placeDsOrderUrl = this.configService.get<string>('DS_ORDER');
    const transformedOrder = plainToInstance(OrderDto, orderDto, {
      enableImplicitConversion: true,
    });
    const params = new URLSearchParams({
      ApiKey: String(dsApiKey),
      TestMode: String(transformedOrder.TestMode),
      ExtOrderID: String(transformedOrder.ExtOrderID),
      ExtOrderPaid: String(transformedOrder.ExtOrderPaid),
      ExtDeliveryCost: String(transformedOrder.ExtDeliveryCost),
      dsDelivery: String(transformedOrder.dsDelivery),
      dsFio: String(transformedOrder.dsFio),
      dsMobPhone: String(transformedOrder.dsMobPhone),
      dsEmail: String(transformedOrder.dsEmail),
      ...(transformedOrder.dsCity && { dsCity: transformedOrder.dsCity }),
      ...(transformedOrder.dsPickUpId && {
        dsPickUpId: String(transformedOrder.dsPickUpId),
      }),
      ...(transformedOrder.ExtDateOfAdded && {
        ExtDateOfAdded: transformedOrder.ExtDateOfAdded,
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
      const response = await firstValueFrom(
        this.httpService.post(placeDsOrderUrl, params.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }),
      );

      const jsonAnswer: ServerResponse = convertXML(response.data);

      return jsonAnswer;
    } catch (error) {
      throw new HttpException(
        `Ошибка размещения заказа ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
