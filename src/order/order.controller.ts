import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { UserService } from '../user/user.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}

  @Get(':telegramId')
  async getOrder(
    @Query('orderID') orderID: string,
    @Param('telegramId') telegramId: string,
  ) {
    const user = await this.userService.user({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    console.log('orderID: ', orderID);

    return this.orderService.getOrder(orderID);
  }

  @Post(':telegramId')
  async createOrder(
    @Body() body: OrderDto,
    @Param('telegramId') telegramId: string,
  ) {
    const user = await this.userService.user({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    console.log('body: ', body);

    return this.orderService.placeOrder(body);
  }
}
