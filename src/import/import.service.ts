import { Injectable } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';
import { getFile } from './utils/get-file';
import {
  catalogFileName,
  productsFileName,
  leftsFileName,
} from './model/const';

@Injectable()
export class ImportService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}

  async updateLefts(url: string) {
    await getFile(url, leftsFileName);
  }

  async downloadCatalog(url: string) {
    return this.importCategoriesData(await getFile(url, catalogFileName));
  }

  async downloadProducts(url: string) {
    return this.importProductsData(await getFile(url, productsFileName));
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
