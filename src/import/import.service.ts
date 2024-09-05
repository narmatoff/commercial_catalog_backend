import { Injectable } from '@nestjs/common';
import { CatalogService } from '../catalog/catalog.service';
import { ProductService } from '../product/product.service';
import { getFile } from './utils/get-file';
import {
  catalogFileName,
  productsFileName,
  offersFileName,
  colorsFileName,
} from './model/const';
import { OfferService } from '../offer/offer.service';
import { ColorService } from '../color/color.service';

@Injectable()
export class ImportService {
  constructor(
    private readonly catalogService: CatalogService,
    private readonly productService: ProductService,
    private readonly offerService: OfferService,
    private readonly colorService: ColorService,
  ) {}

  async downloadCatalog(url: string) {
    return this.importCategoriesData(await getFile(url, catalogFileName));
  }

  async downloadProducts(url: string) {
    return this.importProductsData(await getFile(url, productsFileName));
  }

  async downloadOffers(url: string) {
    return this.importOffersData(await getFile(url, offersFileName));
  }

  async downloadColors(url: string) {
    return this.importColorsData(await getFile(url, colorsFileName));
  }

  // ==============================================================================
  // ==============================================================================
  // ==============================================================================
  // ==============================================================================
  // ==============================================================================

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
    await this.offerService.importOffersFromCsv(filePath);

    // Здесь реализуйте логику импорта данных из CSV в базу данных
    // Например, с использованием библиотеки `csv-parser` или любой другой
  }
  private async importColorsData(filePath: string) {
    await this.colorService.importColorsFromCsv(filePath);

    // Здесь реализуйте логику импорта данных из CSV в базу данных
    // Например, с использованием библиотеки `csv-parser` или любой другой
  }
}
