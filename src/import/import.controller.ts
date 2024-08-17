import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';
import { ImportService } from './import.service';
import * as path from 'node:path';

@Controller('import')
export class ImportController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly importService: ImportService,
  ) {}

  // catalog https://feed.p5s.ru/smartFeedBuild/66c0f46bbd77a5.27496715?spec=catalogs
  // products https://feed.p5s.ru/smartFeedBuild/66c0f46bbd77a5.27496715?spec=full

  @Get('catalog')
  async downloadCatalog(
    @Query('url') url: string,
  ): Promise<{ message: string }> {
    await this.importService.downloadCatalog(url);
    const filePath = path.resolve(__dirname, '..', 'files', 'catalog.csv');

    await this.categoryService.importCategoriesFromCsv(filePath);
    return { message: 'Categories imported successfully' };
  }

  @Get('products')
  async downloadProducts(
    @Query('url') url: string,
  ): Promise<{ message: string }> {
    await this.importService.downloadProducts(url);

    const filePath = path.resolve(__dirname, '..', 'files', 'product.csv');

    await this.productService.importProductsFromCsv(filePath);
    return { message: 'Products imported successfully' };
  }
}
