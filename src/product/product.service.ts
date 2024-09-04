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
            lefts: 0,
          };

          products.push(product);
        })
        .on('end', async () => {
          // Сохраняем продукты в базу данных
          for (const product of products) {
            await this.prisma.product.upsert({
              where: { prodId: product.prodId },
              update: {
                ...product,
              },
              create: {
                ...product,
              },
            });

            console.info('imported product: ', product.prodId);
          }
          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }

  async importOffersFromCsv(filePath: string) {
    const offers = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', async (row) => {
          const offer = {
            prodId: parseInt(row.prodid),
            sku: row.sku,
            barcode: row.barcode,
            name: row.name.replace(/"/g, ''),
            price: parseFloat(row.price),
            WholePrice: parseFloat(row.WholePrice),
            baseWholePrice: parseFloat(row.basewholeprice),
            qty: parseInt(row.qty),
            shippingDate: row.shippingdate,
            weight: row.weight,
            colorName: row.colorName,
            color: row.color,
            size: row.size,
            SuperSale: Boolean(parseInt(row.SuperSale)),
            p5s_stock: Boolean(parseInt(row.p5s_stock)),
            StopPromo: Boolean(parseInt(row.StopPromo)),
            bruttoLength: parseFloat(row.bruttoLength),
            bruttoWidth: parseFloat(row.bruttoWidth),
            bruttoHeight: parseFloat(row.bruttoHeight),
            currency: row.currency,
          };

          offers.push(offer);
        })
        .on('end', async () => {
          // Сохраняем продукты в базу данных
          for (const offer of offers) {
            await this.prisma.productOffers.upsert({
              // TODO доделать
              where: { prodId: offer.prodId },
              update: {
                ...offer,
              },
              create: {
                ...offer,
              },
            });

            console.info('imported offer: ', offer.prodId);
          }
          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }

  async updateLeftsFromCsv(filePath: string) {
    const lefts: { prodId: number; p5sStock: number }[] = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', async (row: { prodid: number; p5s_stock: number }) => {
          const leftItem = {
            prodId: Number(row.prodid),
            p5sStock: Number(row.p5s_stock),
          };
          lefts.push(leftItem);
        })
        .on('end', async () => {
          // Сохраняем остатки в базу данных
          for (const leftItem of lefts) {
            await this.prisma.product.update({
              where: { prodId: leftItem.prodId },
              data: {
                lefts: leftItem.p5sStock,
              },
            });

            console.info('updated lefts: ', leftItem.prodId);
          }
          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }
}
