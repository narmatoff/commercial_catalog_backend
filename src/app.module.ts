import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { CatalogModule } from './catalog/catalog.module';
import { ImportModule } from './import/import.module';
import { BasketModule } from './basket/basket.module';
import { OfferModule } from './offer/offer.module';
import { ColorModule } from './color/color.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ProductModule,
    CatalogModule,
    ImportModule,
    BasketModule,
    OfferModule,
    ColorModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProductService, PrismaService, UserService],
})
export class AppModule {}
