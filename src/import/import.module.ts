import { Module } from '@nestjs/common';
import { ImportController } from './import.controller';
import { CategoryService } from '../category/category.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from '../product/product.service';
import { ImportService } from './import.service';

@Module({
  controllers: [ImportController],
  providers: [CategoryService, PrismaService, ProductService, ImportService],
})
export class ImportModule {}
