import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { telegramId: String(userWhereUniqueInput.telegramId) },
      });
    } catch (error) {
      console.info('error: ', error);

      return null;
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.upsert({
      where: { telegramId: data.telegramId },
      create: data,
      update: data,
    });

    const basket = await this.prisma.basket.findUnique({
      where: { telegramId: user.telegramId },
    });

    if (!basket) {
      await this.prisma.basket.upsert({
        where: { telegramId: user.telegramId },
        update: {},
        create: { user: { connect: { telegramId: user.telegramId } } },
      });
    }

    return user;
  }

  // async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<UserModel> {
  //   return this.prisma.user.delete({
  //     where,
  //   });
  // }
}
