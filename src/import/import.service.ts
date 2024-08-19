import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class ImportService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}

  async updateLefts(url: string) {
    const filePath = path.resolve(__dirname, '..', 'files', 'lefts.csv');

    try {
      const response = await axios.get(url, {
        responseType: 'stream',
      });

      // Создаем папку files, если она не существует
      if (!fs.existsSync(path.resolve(__dirname, '..', 'files'))) {
        fs.mkdirSync(path.resolve(__dirname, '..', 'files'));
      }

      // Сохраняем файл
      const writer = fs.createWriteStream(filePath);

      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error.message);
      throw new Error('Не удалось скачать файл');
    }
  }

  async downloadCatalog(url: string) {
    const filePath = path.resolve(__dirname, '..', 'files', 'catalog.csv');

    try {
      const response = await axios.get(url, {
        responseType: 'stream',
      });

      // Создаем папку files, если она не существует
      if (!fs.existsSync(path.resolve(__dirname, '..', 'files'))) {
        fs.mkdirSync(path.resolve(__dirname, '..', 'files'));
      }

      // Сохраняем файл
      const writer = fs.createWriteStream(filePath);

      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      // Добавьте логику импорта данных после скачивания
      return this.importCategoriesData(filePath);
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error.message);
      throw new Error('Не удалось скачать файл');
    }
  }

  async downloadProducts(url: string) {
    const filePath = path.resolve(__dirname, '..', 'files', 'product.csv');

    try {
      const response = await axios.get(url, {
        responseType: 'stream',
      });

      // Создаем папку files, если она не существует
      if (!fs.existsSync(path.resolve(__dirname, '..', 'files'))) {
        fs.mkdirSync(path.resolve(__dirname, '..', 'files'));
      }

      // Сохраняем файл
      const writer = fs.createWriteStream(filePath);

      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      // Добавьте логику импорта данных после скачивания
      return this.importProductsData(filePath);
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error.message);
      throw new Error('Не удалось скачать файл');
    }
  }

  private async importCategoriesData(filePath: string) {
    await this.categoryService.importCategoriesFromCsv(filePath);

    // Здесь реализуйте логику импорта данных из CSV в базу данных
    // Например, с использованием библиотеки `csv-parser` или любой другой
  }

  private async importProductsData(filePath: string) {
    await this.productService.importProductsFromCsv(filePath);

    // Здесь реализуйте логику импорта данных из CSV в базу данных
    // Например, с использованием библиотеки `csv-parser` или любой другой
  }
}
