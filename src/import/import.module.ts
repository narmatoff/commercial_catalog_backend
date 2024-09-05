import { Module } from '@nestjs/common';
import { ImportController } from './import.controller';
import { CatalogService } from '../catalog/catalog.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from '../product/product.service';
import { ImportService } from './import.service';
import { OfferService } from '../offer/offer.service';
import { ColorService } from '../color/color.service';

@Module({
  controllers: [ImportController],
  providers: [
    CatalogService,
    PrismaService,
    ProductService,
    ImportService,
    OfferService,
    ColorService,
  ],
})
export class ImportModule {}
