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
import { UpdateItemQuantityDto } from './dto/update-Item-quantity.dto';
import { DeleteItemDto } from './dto/delete-Item.dto';

@Controller('basket')
export class BasketController {
  constructor(
    private readonly basketService: BasketService,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Get(':telegramId')
  getUserBasket(@Param('telegramId') telegramId: number) {
    return this.basketService.getUserBasket(telegramId);
  }

  @Post()
  async addItemToBasket(@Body() body: AddItemToBasketDto) {
    return this.basketService.addItemToBasket(
      body.telegramId,
      body.productId,
      body.quantity,
    );
  }

  @Patch()
  updateItemQuantity(@Body() body: UpdateItemQuantityDto) {
    return this.basketService.updateItemQuantity(
      body.telegramId,
      body.productId,
      body.quantity,
    );
  }

  @Delete()
  removeItemFromBasket(@Body() body: DeleteItemDto) {
    return this.basketService.removeItemFromBasket(
      body.telegramId,
      body.productId,
    );
  }

  @Delete('clear/:telegramId')
  clearBasket(@Param('telegramId') telegramId: number) {
    return this.basketService.clearBasket(telegramId);
  }
}
