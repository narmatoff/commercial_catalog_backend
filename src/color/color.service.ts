import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as csv from 'csv-parser';

@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}

  async importColorsFromCsv(filePath: string) {
    const colors = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', async (row) => {
          const color = {
            colorName: row.colorName,
            color: row.color,
            colorUrl: row.colorUrl,
          };

          colors.push(color);
        })
        .on('end', async () => {
          console.info('start import colors ');

          for (const color of colors) {
            const existedColors = await this.prisma.productColor.findMany({
              where: {
                color: {
                  in: colors.map((color) => color.color),
                },
              },
            });

            if (existedColors.find((c) => c.color === color.color)) {
              continue;
            }

            try {
              await this.prisma.productColor.upsert({
                where: { color: color.color },
                update: {
                  ...color,
                },
                create: {
                  ...color,
                },
              });
            } catch (e) {
              console.error('Failed to import color:', color.colorUrl, e);
            }
          }

          console.info('finish import colors ');

          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }
}
