import { Module } from '@nestjs/common';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [OfferController],
  providers: [OfferService, PrismaService],
})
export class OfferModule {}
