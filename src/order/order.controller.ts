import {
  Body,
  Controller,
  Param,
  Post,
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

    console.log(body);
    console.log(this.orderService);

    // TODO: написать дто (const order = new OrderPsDto(body)) которое преобразует базовые типы в типы необходимые для отправки в psApi
    // TODO: отдаем body в сервис (orderService) для обработки в psApi и возвращаем response из psApi

    // TODO: return response
    return body;
  }
}
