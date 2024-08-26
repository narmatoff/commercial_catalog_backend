import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryModule } from './category.module';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async importCategoriesFromCsv(filePath: string): Promise<void> {
    const categories: Category[] = [];
    let i: number = 0;

    return new Promise<void>((resolve, reject): void => {
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', async (row) => {
          i++;
          categories.push({
            id: i,
            categoryId: parseInt(row.id ?? 0),
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
              update: {
                categoryId: category.categoryId,
                parentId: category.parentId,
                name: category.name,
                sort: category.sort,
              },
              create: {
                categoryId: category.categoryId,
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
    return this.prisma.category.findMany({
      orderBy: { sort: 'asc' },
    });
  }
}
