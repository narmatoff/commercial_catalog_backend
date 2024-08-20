import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Сервис для работы с Prisma

@Injectable()
export class BasketService {
  constructor(private prisma: PrismaService) {}

  // Получение корзины пользователя
  async getUserBasket(telegramId: number) {
    const basket = await this.prisma.basket.findUnique({
      where: { telegramId: Number(telegramId) },
      include: { items: { include: { product: true } } },
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
    quantity: number = 1,
  ) {
    // Проверяем, существует ли пользователь
    const user = await this.prisma.user.findUnique({
      where: { telegramId: telegramId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Найдем корзину или создадим новую, если ее нет
    let basket = await this.prisma.basket.findUnique({
      where: { telegramId: telegramId },
    });

    if (!basket) {
      basket = await this.prisma.basket.create({
        data: {
          user: { connect: { telegramId: telegramId } },
        },
      });
    }

    // Проверим, есть ли товар в корзине
    const existingItem = await this.prisma.basketItem.findFirst({
      where: {
        basketId: basket.id,
        productId,
      },
    });

    if (existingItem) {
      // Если товар уже есть в корзине, увеличим количество
      return this.prisma.basketItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      console.log('basketItem.create');
      // Если товара еще нет в корзине, добавим его
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return this.prisma.basketItem.create({
        data: {
          basketId: basket.id,
          productId,
          quantity,
        },
      });
    }
  }

  // Удаление товара из корзины
  async removeItemFromBasket(telegramId: number, productId: number) {
    const basket = await this.prisma.basket.findUnique({
      where: { telegramId: Number(telegramId) },
    });

    if (!basket) {
      throw new NotFoundException('Basket not found');
    }

    const item = await this.prisma.basketItem.findFirst({
      where: {
        basketId: basket.id,
        productId,
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
    productId: number,
    quantity: number,
  ) {
    const basket = await this.prisma.basket.findUnique({
      where: { telegramId },
    });

    if (!basket) {
      throw new NotFoundException('Basket not found');
    }

    const item = await this.prisma.basketItem.findFirst({
      where: {
        basketId: basket.id,
        productId,
      },
    });

    if (!item) {
      throw new NotFoundException('Item not found in basket');
    }

    return this.prisma.basketItem.update({
      where: { id: item.id },
      data: { quantity },
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
