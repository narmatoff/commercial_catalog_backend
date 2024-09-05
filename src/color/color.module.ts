import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ColorService, PrismaService],
})
export class ColorModule {}
