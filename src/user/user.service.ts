import { Injectable } from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserModel | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<UserModel> {
    const user = await this.prisma.user.upsert({
      where: { telegramId: data.telegramId },
      create: data,
      update: data,
    });

    const basket = this.prisma.basket.findUnique({
      where: { telegramId: user.telegramId },
    });

    if (!basket) {
      await this.prisma.basket.create({
        data: {
          user: { connect: { telegramId: user.telegramId } },
        },
      });
    }

    return user;
  }

  // async updateUser(params: {
  //   where: Prisma.UserWhereUniqueInput;
  //   data: Prisma.UserUpdateInput;
  // }): Promise<UserModel> {
  //   const { where, data } = params;
  //   return this.prisma.user.update({
  //     data,
  //     where,
  //   });
  // }

  // async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<UserModel> {
  //   return this.prisma.user.delete({
  //     where,
  //   });
  // }
}
