import { Module } from '@nestjs/common';
import { GoodService } from './good.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [GoodService, PrismaService],
})
export class GoodModule {}
