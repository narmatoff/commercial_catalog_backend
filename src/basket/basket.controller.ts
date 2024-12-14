import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Inject,
  UnauthorizedException,
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
  getUserBasket(@Param('telegramId') telegramId: string) {
    const user = this.userService.user({ telegramId: Number(telegramId) });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    return this.basketService.getUserBasket(Number(telegramId));
  }

  @Post()
  async addItemToBasket(@Body() body: AddItemToBasketDto) {
    const user = await this.userService.user({
      telegramId: Number(body.telegramId),
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    return this.basketService.addItemToBasket(
      body.telegramId,
      body.productId,
      body.productOfferId,
      body.quantity,
    );
  }

  @Patch('item')
  updateItemQuantity(@Body() body: UpdateItemQuantityDto) {
    const user = this.userService.user({ telegramId: Number(body.telegramId) });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    return this.basketService.updateItemQuantity(
      body.telegramId,
      body.itemId,
      body.updateType,
    );
  }

  @Delete('item')
  removeItemFromBasket(@Body() body: DeleteItemDto) {
    const user = this.userService.user({ telegramId: Number(body.telegramId) });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    return this.basketService.removeItemFromBasket(
      body.telegramId,
      body.itemId,
    );
  }

  @Delete('clear/:telegramId')
  clearBasket(@Param('telegramId') telegramId: string) {
    const user = this.userService.user({ telegramId: Number(telegramId) });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    return this.basketService.clearBasket(Number(telegramId));
  }
}
