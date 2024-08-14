import { Injectable } from '@nestjs/common';
import { Good, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GoodService {
  constructor(private prisma: PrismaService) {}

  async good(
    postWhereUniqueInput: Prisma.GoodWhereUniqueInput,
  ): Promise<Good | null> {
    return this.prisma.good.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async goods(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GoodWhereUniqueInput;
    where?: Prisma.GoodWhereInput;
    orderBy?: Prisma.GoodOrderByWithRelationInput;
  }): Promise<Good[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.good.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createGood(data: Prisma.GoodCreateInput): Promise<Good> {
    return this.prisma.good.create({
      data,
    });
  }

  async updateGood(params: {
    where: Prisma.GoodWhereUniqueInput;
    data: Prisma.GoodUpdateInput;
  }): Promise<Good> {
    const { data, where } = params;
    return this.prisma.good.update({
      data,
      where,
    });
  }

  async deleteGood(where: Prisma.GoodWhereUniqueInput): Promise<Good> {
    return this.prisma.good.delete({
      where,
    });
  }
}
