import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [CategoryService, PrismaService],
})
export class CategoryModule {}
