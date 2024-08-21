import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { Product as ProductModel } from '@prisma/client';
import { ProductService } from './product.service';
import { ProductModule } from './product.module';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add')
  async createProduct(@Body() body: CreateProductDto): Promise<ProductModel> {
    return this.productService.createProduct(body);
  }

  @Get('id/:id')
  async getProductById(@Param('id') id: string): Promise<ProductModule> {
    const product = await this.productService.getProduct({ id: Number(id) });
    if (!product) {
      throw new NotFoundException('Product not Found');
    }

    return product;
  }

  @Get('new')
  async getIsNewProducts(): Promise<ProductModel[]> {
    return this.productService.getProducts({
      where: { isNew: true },
    });
  }

  @Get('filtered-products/:searchString')
  async getFilteredPProducts(
    @Param('searchString') searchString: string,
  ): Promise<ProductModel[]> {
    const products = await this.productService.getProducts({
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
    const product = await this.productService.getProduct({ id: Number(id) });
    if (!product) {
      throw new NotFoundException('Product not Found');
    }

    return this.productService.deleteProduct({ id: Number(id) });
  }
}
