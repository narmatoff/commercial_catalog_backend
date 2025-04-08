import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OrderBodyDto } from './dto/order-body.dto';
import { plainToInstance } from 'class-transformer';
import { convertXML } from 'simple-xml-to-json';
import { DsServerApiResponse } from './type/ds-server-api-response';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { EnumResultContentNodes } from './enum/order.enum';
import { Order } from '@prisma/client';
import { getResultNodeContent } from './helpers/get-result-node-content.helper';

@Injectable()
export class OrderService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async getExternalOrder(orderID?: string, ExtOrderID?: string) {
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

  async getInternalOrder(orderId: string): Promise<Order> {
    return this.prismaService.order.findUnique({
      where: {
        dsOrderId: orderId,
      },
    });
  }

  // TODO: готово! протестировать с разными параметрами!
  async placeExternalOrder(orderDto: OrderBodyDto) {
    const dsApiKey = this.configService.get<string>('DS_API_KEY');
    const placeDsOrderUrl = this.configService.get<string>('DS_ORDER');
    const transformedOrder = plainToInstance(OrderBodyDto, orderDto, {
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

      const jsonAnswer: DsServerApiResponse = convertXML(response.data);

      return jsonAnswer;
    } catch (error) {
      throw new HttpException(
        `Ошибка размещения заказа ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createInternalOrder(
    dsOrder: DsServerApiResponse,
    telegramId: string,
  ): Promise<Order> {
    const orderId = getResultNodeContent(
      dsOrder.Result.children[2],
      EnumResultContentNodes.OrderId,
    );

    let internalOrder: Order;

    try {
      const order = {
        data: {
          dsOrderId: orderId,
          telegramId: telegramId,
        },
      };

      // 1. Создаем внутреннюю запись
      internalOrder = await this.prismaService.order.create(order);
    } catch (error) {
      throw new HttpException(
        `Ошибка: ${error.meta.target}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return internalOrder;
  }

  async getOrderListByUser(telegramId: string) {
    return this.prismaService.order.findMany({
      where: { telegramId: telegramId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
