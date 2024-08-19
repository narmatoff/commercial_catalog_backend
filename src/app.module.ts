import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { CategoryModule } from './category/category.module';
import { ImportModule } from './import/import.module';
import { BasketModule } from './basket/basket.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ProductModule,
    CategoryModule,
    ImportModule,
    BasketModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProductService, PrismaService, UserService],
})
export class AppModule {}
