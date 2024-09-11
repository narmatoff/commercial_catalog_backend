import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as csv from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async importOffersFromCsv(filePath: string) {
    const offers = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', async (row) => {
          const offer = {
            prodId: parseInt(row.prodid),
            sku: parseInt(row.sku),
            barcode: row.barcode,
            name: row.name.replace(/"/g, ''),
            price: parseFloat(row.price),
            WholePrice: parseFloat(row.WholePrice),
            basewholeprice: parseFloat(row.basewholeprice),
            qty: parseInt(row.qty),
            shippingdate: row.shippingdate || null,
            weight: parseFloat(row.weight) || null,
            colorName: row.colorName,
            color: row.color,
            size: row.size || null,
            SuperSale: Boolean(parseInt(row.SuperSale)) || null,
            p5s_stock: Boolean(parseInt(row.p5s_stock)),
            StopPromo: Boolean(parseInt(row.StopPromo)),
            bruttoLength: parseFloat(row.bruttoLength) || null,
            bruttoWidth: parseFloat(row.bruttoWidth) || null,
            bruttoHeight: parseFloat(row.bruttoHeight) || null,
            currency: row.currency,
          };

          offers.push(offer);
        })
        .on('end', async () => {
          console.info('start import offers ');

          for (const offer of offers) {
            try {
              await this.prisma.productOffer.upsert({
                where: { sku: offer.sku }, //some unique key
                update: {
                  ...offer,
                },
                create: {
                  ...offer,
                },
              });
            } catch (e) {
              console.error('Failed to import offer:', offer.prodId, e);
            }
          }

          console.info('finish import offers ');
          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }
}
