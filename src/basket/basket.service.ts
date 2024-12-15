import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EnumUpdateType } from './enum';
import { BasketItem } from '@prisma/client'; // Сервис для работы с Prisma

@Injectable()
export class BasketService {
  constructor(private prisma: PrismaService) {}

  // Получение корзины пользователя
  async getUserBasket(telegramId: number) {
    const basket = await this.prisma.basket.findUnique({
      where: { telegramId: Number(telegramId) },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                infoPrice: true,
              },
            },
            productOffer: {
              select: {
                id: true,
                qty: true,
                price: true,
              },
            },
          },
        },
      },
    });

    if (!basket) {
      throw new NotFoundException('Basket not found');
    }

    return basket;
  }

  // Добавление товара в корзину
  async addItemToBasket(
    telegramId: number,
    productId: number,
    productOfferId: number,
    quantity: number = 1,
  ) {
    const [basket, existingBasketItem, product, productOffer] =
      await Promise.all([
        this.prisma.basket.upsert({
          where: { telegramId },
          update: {},
          create: { user: { connect: { telegramId } } },
        }),
        this.prisma.basketItem.findFirst({
          where: { productOfferId, productId },
        }),
        this.prisma.product.findUnique({ where: { prodId: productId } }),
        this.prisma.productOffer.findUnique({ where: { id: productOfferId } }),
      ]);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (!productOffer) {
      throw new NotFoundException('Product offer not found');
    }

    const itemData = {
      data: {
        basketId: basket.id,
        productId: productId,
        productOfferId: productOfferId,
        quantity: quantity,
      },
    };

    return existingBasketItem?.productOfferId === productOfferId
      ? this.prisma.basketItem.update({
          where: { id: existingBasketItem.id },
          data: { quantity: existingBasketItem.quantity + quantity },
        })
      : this.prisma.basketItem.create(itemData);
  }

  // Удаление товара из корзины
  async removeItemFromBasket(telegramId: number, itemId: number) {
    const basket = await this.prisma.basket.findUnique({
      where: { telegramId: Number(telegramId) },
    });

    if (!basket) {
      throw new NotFoundException('Basket not found');
    }

    const item = await this.prisma.basketItem.findFirst({
      where: {
        basketId: basket.id,
        id: itemId,
      },
    });

    if (!item) {
      throw new NotFoundException('Item not found in basket');
    }

    return this.prisma.basketItem.delete({
      where: { id: item.id },
    });
  }

  // Изменение количества товара в корзине
  async updateItemQuantity(
    telegramId: number,
    itemId: number,
    type: EnumUpdateType,
  ): Promise<BasketItem> {
    const basket = await this.prisma.basket.findUnique({
      where: { telegramId },
    });

    if (!basket) {
      throw new NotFoundException('Basket not found');
    }

    const item = await this.prisma.basketItem.findFirst({
      where: {
        basketId: basket.id,
        id: itemId,
      },
    });

    if (!item) {
      throw new NotFoundException('Item not found in basket');
    }

    let itemQuantity: number = 0;
    if (item.quantity >= 1) {
      itemQuantity =
        type === EnumUpdateType.INCREMENT
          ? item.quantity + 1
          : item.quantity - 1;
    }

    if (type === EnumUpdateType.DECREMENT && item.quantity === 1) {
      return this.removeItemFromBasket(telegramId, item.id);
    }

    return this.prisma.basketItem.update({
      where: { id: item.id },
      data: {
        quantity: itemQuantity,
      },
    });
  }

  // Очистка корзины
  async clearBasket(telegramId: number) {
    const basket = await this.prisma.basket.findUnique({
      where: { telegramId: Number(telegramId) },
    });

    if (!basket) {
      throw new NotFoundException('Basket not found');
    }

    return this.prisma.basketItem.deleteMany({
      where: { basketId: basket.id },
    });
  }
}
