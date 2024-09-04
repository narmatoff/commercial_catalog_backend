import { Injectable } from '@nestjs/common';
import { CatalogService } from '../catalog/catalog.service';
import { ProductService } from '../product/product.service';
import { getFile } from './utils/get-file';
import {
  catalogFileName,
  productsFileName,
  leftsFileName,
  offersFileName,
} from './model/const';

@Injectable()
export class ImportService {
  constructor(
    private readonly catalogService: CatalogService,
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

  async downloadOffers(url: string) {
    return this.importOffersData(await getFile(url, offersFileName));
  }

  private async importCategoriesData(filePath: string) {
    await this.catalogService.importCategoriesFromCsv(filePath);

    // Здесь реализуйте логику импорта данных из CSV в базу данных
    // Например, с использованием библиотеки `csv-parser` или любой другой
  }

  private async importProductsData(filePath: string) {
    await this.productService.importProductsFromCsv(filePath);

    // Здесь реализуйте логику импорта данных из CSV в базу данных
    // Например, с использованием библиотеки `csv-parser` или любой другой
  }
  private async importOffersData(filePath: string) {
    await this.productService.importOffersFromCsv(filePath);

    // Здесь реализуйте логику импорта данных из CSV в базу данных
    // Например, с использованием библиотеки `csv-parser` или любой другой
  }
}
