import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { UserService } from '../user/user.service';
import { ServerResponse } from './type/server-response';
import { EnumResultStatus } from './enum/order.enum';
import { getResultStatusMessage } from './helpers/helpers';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}

  @Get(':telegramId')
  async getOrder(
    // ExtOrderID и/или orderID - в запросе должен быть, как минимум, один из этих параметров.
    // ExtOrderID - идентификатор заказа в Вашем интернет-магазине. Если запрашивается информация о нескольких заказах, то идентификаторы отделяются друг от друга запятой.
    // oderID - идентификатор заказа в нашей системе. Если запрашивается информация о нескольких заказах, то идентификаторы отделяются друг от друга запятой.
    @Query('orderID') orderID: string,
    @Param('telegramId') telegramId: string,
  ): Promise<ServerResponse> {
    const user = await this.userService.user({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    return this.orderService.getDsOrder(orderID);
  }

  @Post(':telegramId')
  async createOrder(
    @Body() body: OrderDto,
    @Param('telegramId') telegramId: string,
  ): Promise<ServerResponse> {
    const user = await this.userService.user({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    const externalOrder = await this.orderService.placeDsOrder(body);

    const resultStatus: EnumResultStatus = Number(
      Object.values(externalOrder.Result.children[0])[0].content,
    );

    const statusMessage = getResultStatusMessage(resultStatus);

    if (resultStatus !== EnumResultStatus.Ok) {
      throw new HttpException(statusMessage, HttpStatus.BAD_REQUEST);
    }

    // TODO: создать заказ в таблице Order

    return externalOrder;
  }
}
