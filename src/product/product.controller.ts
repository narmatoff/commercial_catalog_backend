import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { Product as ProductModel } from '@prisma/client';
import { ProductService } from './product.service';
import { ProductModule } from './product.module';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<ProductModule> {
    return this.productService.product({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedProducts(): Promise<ProductModel[]> {
    return this.productService.products({
      where: { isNew: true },
    });
  }

  @Get('filtered-products/:searchString')
  async getFilteredPProducts(
    @Param('searchString') searchString: string,
  ): Promise<ProductModel[]> {
    const products = await this.productService.products({
      where: {
        OR: [
          {
            name: { contains: searchString },
          },
          {
            description: { contains: searchString },
          },
        ],
      },
    });

    if (!products.length) {
      throw new NotFoundException('Not found');
    }

    return products;
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.deleteProduct({ id: Number(id) });
  }
}
