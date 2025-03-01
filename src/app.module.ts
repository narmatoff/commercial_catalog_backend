import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CatalogModule } from './catalog/catalog.module';
import { ImportModule } from './import/import.module';
import { BasketModule } from './basket/basket.module';
import { OfferModule } from './offer/offer.module';
import { ColorModule } from './color/color.module';
import { OrderModule } from './order/order.module';

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
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
