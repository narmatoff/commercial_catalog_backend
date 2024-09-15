import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProductController } from './product.controller';
import { UserService } from '../user/user.service';

@Module({
  providers: [ProductService, PrismaService, UserService],
  controllers: [ProductController],
})
export class ProductModule {}
