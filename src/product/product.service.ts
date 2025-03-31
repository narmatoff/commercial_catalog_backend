import { Injectable } from '@nestjs/common';
import { Product as ProductModel, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getProduct(
    postWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<ProductModel | null> {
    return this.prisma.product.findUnique({
      where: postWhereUniqueInput,
      include: {
        offers: true,
      },
    });
  }

  async getProducts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<ProductModel[]> {
    return this.prisma.product.findMany({
      ...params,
      include: {
        offers: true,
      },
    });
  }

  async createProduct(data: CreateProductDto): Promise<ProductModel> {
    return this.prisma.product.upsert({
      where: {
        prodId: data.prodId,
      },
      create: data,
      update: data,
    });
  }

  async deleteProduct(
    where: Prisma.ProductWhereUniqueInput,
  ): Promise<ProductModel> {
    return this.prisma.product.delete({
      where,
    });
  }

  async importProductsFromCsv(filePath: string) {
    const products = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', async (row) => {
          const product = {
            prodId: parseInt(row.prodid),
            name: row.name.replace(/"/g, ''),
            vendorCode: row.vendor_code,
            vendorId: parseInt(row.vendor_id),
            infoPrice: parseFloat(row.infoprice),
            description: row.description.replace(/"/g, ''),
            batteries: row.batteries || null,
            pack: row.pack,
            material: row.material,
            length: row.length ? parseFloat(row.length) : null,
            diameter: row.diameter ? parseFloat(row.diameter) : null,
            collection: row.collection || null,
            img1: row.img1 || null,
            img2: row.img2 || null,
            img3: row.img3 || null,
            img4: row.img4 || null,
            img5: row.img5 || null,
            img6: row.img6 || null,
            img7: row.img7 || null,
            img8: row.img8 || null,
            img9: row.img9 || null,
            img10: row.img10 || null,
            categoryId: parseInt(row.categoryId),
            isNew: Boolean(parseInt(row.new)),
            isBestseller: Boolean(parseInt(row.bestseller)),
            function: row.function || null,
            addFunction: row.addfunction || null,
            vibration: row.vibration || null,
            volume: row.volume || null,
            modelYear: row.modelyear ? parseInt(row.modelyear) : null,
            imgStatus: Boolean(parseInt(row.img_status)),
          };

          products.push(product);
        })
        .on('end', async () => {
          console.info('start import products');

          for (const product of products) {
            try {
              await this.prisma.product.upsert({
                where: { prodId: product.prodId },
                update: {
                  ...product,
                },
                create: {
                  ...product,
                },
              });
            } catch (e) {
              console.error('Failed to import product:', product.prodId, e);
            }
          }

          console.info('finish import products');

          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }
}
