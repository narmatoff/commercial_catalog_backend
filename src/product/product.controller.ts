import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { Product as ProductModel } from '@prisma/client';
import { ProductService } from './product.service';
import { ProductModule } from './product.module';
import { CreateProductDto } from './dto/create-product.dto';
import { UserService } from '../user/user.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  @Post('add/:telegramId')
  async createProduct(
    @Body() body: CreateProductDto,
    @Param('telegramId') telegramId: string,
  ): Promise<ProductModel> {
    const user = await this.userService.user({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    return this.productService.createProduct(body);
  }

  @Get('id/:id/:telegramId')
  async getProductById(
    @Param('id') id: string,
    @Param('telegramId') telegramId: string,
  ): Promise<ProductModule> {
    const user = await this.userService.user({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    const product = await this.productService.getProduct({
      prodId: Number(id),
    });
    if (!product) {
      throw new NotFoundException('Product not Found');
    }

    return product;
  }

  @Get('new/:telegramId')
  async getIsNewProducts(
    @Param('telegramId') telegramId: string,
  ): Promise<ProductModel[]> {
    const user = await this.userService.user({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    return this.productService.getProducts({
      where: { isNew: true },
    });
  }

  @Get('filtered-products/:searchString/:telegramId')
  async getFilteredPProducts(
    @Param('searchString') searchString: string,
    @Param('telegramId') telegramId: string,
  ): Promise<ProductModel[]> {
    const user = await this.userService.user({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    const products = await this.productService.getProducts({
      where: {
        OR: [
          {
            name: { contains: searchString },
          },
          {
            description: { contains: searchString },
          },
          {
            function: { contains: searchString },
          },
          {
            addFunction: { contains: searchString },
          },
        ],
      },
    });

    if (!products.length) {
      throw new NotFoundException('Not found');
    }

    return products;
  }

  @Get('category-products/:categoryNumber/:telegramId')
  async getCategoryProducts(
    @Param('categoryNumber') categoryNumber: number,
    @Param('telegramId') telegramId: string,
  ): Promise<ProductModel[]> {
    const user = await this.userService.user({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    return await this.productService.getProducts({
      where: {
        categoryId: Number(categoryNumber),
      },
    });
  }

  @Delete('/:id/:telegramId')
  async deleteProduct(
    @Param('id') id: string,
    @Param('telegramId') telegramId: string,
  ): Promise<ProductModel> {
    const user = await this.userService.user({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    const product = await this.productService.getProduct({ id: Number(id) });
    if (!product) {
      throw new NotFoundException('Product not Found');
    }

    return this.productService.deleteProduct({ id: Number(id) });
  }
}
