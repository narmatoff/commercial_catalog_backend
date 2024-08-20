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
    });
  }

  async getProducts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<ProductModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProduct(data: CreateProductDto): Promise<ProductModel> {
    return this.prisma.product.create({
      data,
    });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<ProductModel> {
    const { data, where } = params;
    return this.prisma.product.update({
      data,
      where,
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
            id: parseInt(row.prodid),
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
            img1: row.img1,
            img2: row.img2 || null,
            img3: row.img3 || null,
            img4: row.img4 || null,
            img5: row.img5 || null,
            img6: row.img6 || null,
            img7: row.img7 || null,
            img8: row.img8 || null,
            img9: row.img9 || null,
            img10: row.img10 || null,
            // categoryId: parseInt(row.categoryId),
            category: {
              connect: { id: parseInt(row.categoryId) }, // Здесь устанавливается связь
            },
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
          // Сохраняем продукты в базу данных
          for (const product of products) {
            // check product in db
            const checkedProduct = await this.prisma.product.findUnique({
              where: { id: product.id },
            });
            if (checkedProduct) {
              console.info('update product: ', product.id);
              await this.prisma.product.update({
                where: { id: product.id },
                data: product,
              });
              continue;
            }

            console.info('create product: ', product.id);
            await this.prisma.product.create({ data: product });
          }
          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }

  async updateLeftsFromCsv(filePath: string) {
    const lefts: { prodId: number; lefts: number }[] = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on(
          'data',
          async (row: {
            prodID: number;
            readyToGo: number;
            p5sStock: number;
          }) => {
            const leftItem = {
              prodId: Number(row.prodID),
              lefts: Number(row.p5sStock),
            };
            lefts.push(leftItem);
          },
        )
        .on('end', async () => {
          // Сохраняем остатки в базу данных
          for (const leftItem of lefts) {
            console.log(leftItem);
            // check left in db
            const checkedProduct = await this.prisma.product.findUnique({
              where: { id: leftItem.prodId },
            });
            if (checkedProduct) {
              console.info('update lefts: ', leftItem.prodId);
              await this.prisma.product.update({
                where: { id: leftItem.prodId },
                data: leftItem,
              });
            }
          }
          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }
}
