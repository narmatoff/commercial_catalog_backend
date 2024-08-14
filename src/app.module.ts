import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { GoodModule } from './good/good.module';
import { GoodService } from './good/good.service';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';

@Module({
  imports: [PrismaModule, UserModule, GoodModule],
  controllers: [AppController],
  providers: [AppService, GoodService, PrismaService, UserService],
})
export class AppModule {}
