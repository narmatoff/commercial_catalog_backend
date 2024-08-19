import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Module({
  providers: [BasketService, PrismaService, UserService],
  controllers: [BasketController],
})
export class BasketModule {}
