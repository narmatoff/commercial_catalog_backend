import { Controller, Get, Query } from '@nestjs/common';
import { ImportService } from './import.service';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Get('catalog')
  async downloadCatalog(
    @Query('url') url: string,
  ): Promise<{ message: string }> {
    await this.importService.downloadCatalog(url);

    return { message: 'Categories imported successfully' };
  }

  @Get('products')
  async downloadProducts(
    @Query('url') url: string,
  ): Promise<{ message: string }> {
    await this.importService.downloadProducts(url);

    return { message: 'Products imported successfully' };
  }

  @Get('offers')
  async downloadOffers(
    @Query('url') url: string,
  ): Promise<{ message: string }> {
    await this.importService.downloadOffers(url);

    return { message: 'Offers imported successfully' };
  }

  @Get('colors')
  async downloadColors(
    @Query('url') url: string,
  ): Promise<{ message: string }> {
    await this.importService.downloadColors(url);

    return { message: 'Offers imported successfully' };
  }
}
