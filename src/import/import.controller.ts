import { Controller, Get, Query } from '@nestjs/common';
import { CatalogService } from '../catalog/catalog.service';
import { ProductService } from '../product/product.service';
import { ImportService } from './import.service';
import * as path from 'node:path';
import {
  catalogFileName,
  fileDirectory,
  productsFileName,
  leftsFileName,
} from './model/const';

@Controller('import')
export class ImportController {
  constructor(
    private readonly catalogService: CatalogService,
    private readonly productService: ProductService,
    private readonly importService: ImportService,
  ) {}

  @Get('catalog')
  async downloadCatalog(
    @Query('url') url: string,
  ): Promise<{ message: string }> {
    await this.importService.downloadCatalog(url);
    const filePath = path.resolve(
      fileDirectory,
      '..',
      'files',
      catalogFileName,
    );

    await this.catalogService.importCategoriesFromCsv(filePath);
    return { message: 'Categories imported successfully' };
  }

  @Get('products')
  async downloadProducts(
    @Query('url') url: string,
  ): Promise<{ message: string }> {
    await this.importService.downloadProducts(url);

    const filePath = path.resolve(
      fileDirectory,
      '..',
      'files',
      productsFileName,
    );

    await this.productService.importProductsFromCsv(filePath);
    return { message: 'Products imported successfully' };
  }

  @Get('lefts')
  async updateProductsLefts(
    @Query('url') url: string,
  ): Promise<{ message: string }> {
    await this.importService.updateLefts(url);

    const filePath = path.resolve(fileDirectory, '..', 'files', leftsFileName);

    await this.productService.updateLeftsFromCsv(filePath);
    return { message: 'Lefts updated successfully' };
  }
}
