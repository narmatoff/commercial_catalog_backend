import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { PrismaService } from '../prisma/prisma.service';
import { CatalogController } from './catalog.controller';

@Module({
  providers: [CatalogService, PrismaService],
  controllers: [CatalogController],
})
export class CatalogModule {}
