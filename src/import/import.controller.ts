import {
  Controller,
  Get,
  Param,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ImportService } from './import.service';
import { UserService } from '../user/user.service';

@Controller('import')
export class ImportController {
  constructor(
    private readonly importService: ImportService,
    private readonly userService: UserService,
  ) {}

  @Get('catalog/:telegramId/:url')
  async downloadCatalog(
    @Query('url') url: string,
    @Param('telegramId') telegramId: string,
  ): Promise<{ message: string }> {
    const user = await this.userService.user({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    await this.importService.importCategoriesData(url);

    return { message: 'Categories imported successfully' };
  }

  @Get('products/:telegramId/:url')
  async downloadProducts(
    @Query('url') url: string,
    @Param('telegramId') telegramId: string,
  ): Promise<{ message: string }> {
    const user = await this.userService.user({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }
    await this.importService.importProductsData(url);

    return { message: 'Products imported successfully' };
  }

  @Get('offers/:telegramId/:url')
  async downloadOffers(
    @Query('url') url: string,
    @Param('telegramId') telegramId: string,
  ): Promise<{ message: string }> {
    const user = await this.userService.user({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    await this.importService.importOffersData(url);

    return { message: 'Offers imported successfully' };
  }

  @Get('colors/:telegramId/:url')
  async downloadColors(
    @Query('url') url: string,
    @Param('telegramId') telegramId: string,
  ): Promise<{ message: string }> {
    const user = await this.userService.user({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    await this.importService.importColorsData(url);

    return { message: 'Colors imported successfully' };
  }
}
