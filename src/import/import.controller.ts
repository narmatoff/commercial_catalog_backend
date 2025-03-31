import { Controller, Get, Param, UnauthorizedException } from '@nestjs/common';
import { ImportService } from './import.service';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Controller('import')
export class ImportController {
  constructor(
    private readonly configService: ConfigService,
    private readonly importService: ImportService,
    private readonly userService: UserService,
  ) {}

  @Get('catalog/:telegramId')
  async downloadCatalog(
    @Param('telegramId') telegramId: string,
  ): Promise<{ message: string }> {
    const user = await this.userService.getUser({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    const categoriesDataUrl =
      this.configService.get<string>('IMPORT_CATALOG_URL');
    await this.importService.importCategoriesData(categoriesDataUrl);

    return { message: 'Categories imported successfully' };
  }

  @Get('products/:telegramId')
  async downloadProducts(
    @Param('telegramId') telegramId: string,
  ): Promise<{ message: string }> {
    const user = await this.userService.getUser({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    const productsDataUrl = this.configService.get<string>(
      'IMPORT_PRODUCTS_URL',
    );
    await this.importService.importProductsData(productsDataUrl);

    return { message: 'Products imported successfully' };
  }

  @Get('offers/:telegramId')
  async downloadOffers(
    @Param('telegramId') telegramId: string,
  ): Promise<{ message: string }> {
    const user = await this.userService.getUser({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    const offersDataUrl = this.configService.get<string>('IMPORT_OFFERS_URL');
    await this.importService.importOffersData(offersDataUrl);

    return { message: 'Offers imported successfully' };
  }

  @Get('colors/:telegramId')
  async downloadColors(
    @Param('telegramId') telegramId: string,
  ): Promise<{ message: string }> {
    const user = await this.userService.getUser({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    const colorsDataUrl = this.configService.get<string>('IMPORT_COLORS_URL');
    await this.importService.importColorsData(colorsDataUrl);

    return { message: 'Colors imported successfully' };
  }

  @Get('full/:telegramId')
  async fullImport(@Param('telegramId') telegramId: string) {
    const user = await this.userService.getUser({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    const categoriesDataUrl =
      this.configService.get<string>('IMPORT_CATALOG_URL');
    const colorsDataUrl = this.configService.get<string>('IMPORT_COLORS_URL');
    const productsDataUrl = this.configService.get<string>(
      'IMPORT_PRODUCTS_URL',
    );
    const offersDataUrl = this.configService.get<string>('IMPORT_OFFERS_URL');

    // catalog
    await this.importService.importCategoriesData(categoriesDataUrl);
    // Colors
    await this.importService.importColorsData(colorsDataUrl);
    // Products
    await this.importService.importProductsData(productsDataUrl);
    // Offers
    await this.importService.importOffersData(offersDataUrl);

    return { message: 'Full Import successfully' };
  }
}
