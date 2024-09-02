import { Controller, Get, NotFoundException } from '@nestjs/common';
import { CatalogModule } from './catalog.module';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  async getCategoryList(): Promise<CatalogModule> {
    const categories = await this.catalogService.getCategories();

    if (!categories) {
      throw new NotFoundException('Category not Found');
    }

    return categories;
  }
}
