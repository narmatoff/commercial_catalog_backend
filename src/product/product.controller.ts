import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product as ProductModel } from '@prisma/client';
import { ProductService } from './product.service';
import { ProductModule } from './product.module';
import { CreateProductDto } from './dto/create-product.dto';

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
      where: { published: true },
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
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });

    if (!products.length) {
      throw new NotFoundException('Not found');
    }

    return products;
  }

  @Post()
  async createDraft(
    @Body()
    productData: CreateProductDto,
  ): Promise<ProductModel> {
    const { title, content, authorEmail, imageUrl } = productData;
    return this.productService.createProduct({
      title,
      content,
      imageUrl,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put('publish/:id')
  async publishProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.updateProduct({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.deleteProduct({ id: Number(id) });
  }
}
