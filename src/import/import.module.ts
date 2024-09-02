import { Module } from '@nestjs/common';
import { ImportController } from './import.controller';
import { CatalogService } from '../catalog/catalog.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from '../product/product.service';
import { ImportService } from './import.service';

@Module({
  controllers: [ImportController],
  providers: [CatalogService, PrismaService, ProductService, ImportService],
})
export class ImportModule {}
