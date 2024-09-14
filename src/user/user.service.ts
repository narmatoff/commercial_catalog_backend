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

  // async users(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.UserWhereUniqueInput;
  //   where?: Prisma.UserWhereInput;
  //   orderBy?: Prisma.UserOrderByWithRelationInput;
  // }): Promise<UserModel[]> {
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.user.findMany({
  //     skip,
  //     take,
  //     cursor,
  //     where,
  //     orderBy,
  //   });
  // }

  async createUser(data: Prisma.UserCreateInput): Promise<UserModel> {
    const user = await this.prisma.user.create({
      data,
    });

    // заводим корзину для пользователя
    await this.prisma.basket.create({
      data: {
        user: { connect: { telegramId: user.telegramId } },
      },
    });

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
