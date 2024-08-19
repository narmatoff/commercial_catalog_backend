import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Inject,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { AddItemToBasketDto } from './dto/add-item-to-basket.dto';
import { UserService } from '../user/user.service';

@Controller('basket')
export class BasketController {
  constructor(
    private readonly basketService: BasketService,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  // Получение содержимого корзины
  @Get(':telegramId')
  getUserBasket(@Param('telegramId') telegramId: number) {
    return this.basketService.getUserBasket(telegramId);
  }

  // Добавление товара в корзину
  @Post()
  async addItemToBasket(@Body() body: AddItemToBasketDto) {
    return this.basketService.addItemToBasket(
      body.telegramId,
      body.productId,
      body.quantity,
    );
  }

  // Обновление количества товара
  @Patch(':telegramId/update')
  updateItemQuantity(
    @Param('telegramId') telegramId: number,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
  ) {
    return this.basketService.updateItemQuantity(
      telegramId,
      productId,
      quantity,
    );
  }

  // Удаление товара из корзины
  @Delete(':telegramId/remove')
  removeItemFromBasket(
    @Param('telegramId') telegramId: number,
    @Body('productId') productId: number,
  ) {
    return this.basketService.removeItemFromBasket(telegramId, productId);
  }

  // Очистка корзины
  @Delete(':telegramId/clear')
  clearBasket(@Param('telegramId') telegramId: number) {
    return this.basketService.clearBasket(telegramId);
  }
}
