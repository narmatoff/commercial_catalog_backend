import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [OrderService, UserService, PrismaService],
  controllers: [OrderController],
  imports: [HttpModule],
})
export class OrderModule {}
