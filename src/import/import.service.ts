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

  async importCategoriesData(url: string): Promise<void> {
    const filePath = await getFile(url, catalogFileName);

    await this.catalogService.importCategoriesFromCsv(filePath);
  }

  async importProductsData(url: string): Promise<void> {
    const filePath = await getFile(url, productsFileName);

    await this.productService.importProductsFromCsv(filePath);
  }

  async importOffersData(url: string): Promise<void> {
    const filePath = await getFile(url, offersFileName);

    await this.offerService.importOffersFromCsv(filePath);
  }

  async importColorsData(url: string): Promise<void> {
    const filePath = await getFile(url, colorsFileName);

    await this.colorService.importColorsFromCsv(filePath);
  }
}
