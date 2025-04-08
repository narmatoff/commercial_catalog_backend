import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { OrderService } from './order.service';
import { OrderBodyDto } from './dto/order-body.dto';
import { UserService } from '../user/user.service';
import { DsServerApiResponse } from './type/ds-server-api-response';
import { BasketService } from '../basket/basket.service';
import { checkDsOrderStatusHelper } from './helpers/check-ds-order-status.helper';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
    private readonly basketService: BasketService,
  ) {}

  @Post(':telegramId')
  async createOrder(
    @Body() body: OrderBodyDto,
    @Param('telegramId') telegramId: string,
  ) {
    const user = await this.userService.getUser({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    const externalOrder = await this.orderService.placeExternalOrder(body);
    checkDsOrderStatusHelper(externalOrder);

    const internalOrder = await this.orderService.createInternalOrder(
      externalOrder,
      user.telegramId,
    );

    await this.basketService.clearBasket(user.telegramId);

    return internalOrder;
  }

  @Get(':telegramId')
  async getOrder(
    // ExtOrderID и/или orderID - в запросе должен быть, как минимум, один из этих параметров.
    // ExtOrderID - идентификатор заказа в Вашем интернет-магазине. Если запрашивается информация о нескольких заказах, то идентификаторы отделяются друг от друга запятой.
    // oderID - идентификатор заказа в нашей системе. Если запрашивается информация о нескольких заказах, то идентификаторы отделяются друг от друга запятой.
    @Query('orderID') orderID: string,
    @Param('telegramId') telegramId: string,
  ): Promise<DsServerApiResponse> {
    // проверяем пользователя
    const user: User = await this.userService.getUser({
      telegramId: telegramId,
    });
    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    // проверяем наличие локального заказа
    const order = await this.orderService.getInternalOrder(orderID);
    if (!order) {
      throw new NotFoundException('Заказ не зарегистрирован');
    }

    return this.orderService.getExternalOrder(orderID);
  }

  @Get('list/:telegramId')
  async getOrderList(@Param('telegramId') telegramId: string) {
    const user: User = await this.userService.getUser({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    return this.orderService.getOrderListByUser(telegramId);
  }
}
