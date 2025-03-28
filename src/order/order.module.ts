import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { BasketService } from '../basket/basket.service';

@Module({
  providers: [OrderService, UserService, PrismaService, BasketService],
  controllers: [OrderController],
  imports: [HttpModule],
})
export class OrderModule {}
