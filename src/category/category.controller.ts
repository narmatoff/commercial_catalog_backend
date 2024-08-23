import { Controller, Get, NotFoundException } from '@nestjs/common';
import { CategoryModule } from './category.module';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategoryList(): Promise<CategoryModule> {
    const categories = await this.categoryService.getCategories();

    if (!categories) {
      throw new NotFoundException('Category not Found');
    }

    return categories;
  }
}
