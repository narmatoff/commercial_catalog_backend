import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryModule } from './category.module';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async importCategoriesFromCsv(filePath: string): Promise<void> {
    const categories = [];

    return new Promise<void>((resolve, reject): void => {
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', async (row) => {
          categories.push({
            id: parseInt(row.id ?? 0),
            parentId: row.parentId ? parseInt(row.parentId) : null,
            name: row.name.replace(/"/g, ''), // Убираем кавычки
            sort: parseInt(row.sort),
          });
        })
        .on('end', async () => {
          // Сохраняем категории в базу данных

          for (const category of categories) {
            if (!category.id) {
              console.warn('Continue without category: ', category);

              continue;
            }
            await this.prisma.category.upsert({
              // TODO category.id может быть null добавить в модель уникальный id @autoincrement;
              where: { id: category.id },
              update: {
                id: category.id,
                parentId: category.parentId,
                name: category.name,
                sort: category.sort,
              },
              create: {
                id: category.id,
                parentId: category.parentId,
                name: category.name,
                sort: category.sort,
              },
            });
          }
          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }

  async getCategories(): Promise<CategoryModule> {
    return this.prisma.category.findMany();
  }
}
