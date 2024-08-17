import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async importCategoriesFromCsv(filePath: string) {
    const categories = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', async (row) => {
          categories.push({
            id: parseInt(row.id),
            parentId: row.parentId ? parseInt(row.parentId) : null,
            name: row.name.replace(/"/g, ''), // Убираем кавычки
            sort: parseInt(row.sort),
          });
        })
        .on('end', async () => {
          // Сохраняем категории в базу данных
          for (const category of categories) {
            await this.prisma.category.upsert({
              where: { id: category.id },
              update: category,
              create: category,
            });
          }
          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }
}
