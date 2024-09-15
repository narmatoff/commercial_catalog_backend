import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { PrismaService } from '../prisma/prisma.service';
import { CatalogController } from './catalog.controller';
import { UserService } from '../user/user.service';

@Module({
  providers: [CatalogService, PrismaService, UserService],
  controllers: [CatalogController],
})
export class CatalogModule {}
