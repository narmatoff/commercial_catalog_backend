import { Module } from '@nestjs/common';
import { GoodService } from './good.service';
import { PrismaService } from '../prisma/prisma.service';
import { GoodController } from './good.controller';

@Module({
  providers: [GoodService, PrismaService],
  controllers: [GoodController],
})
export class GoodModule {}
