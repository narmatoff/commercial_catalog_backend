import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { CatalogModule } from './catalog.module';
import { CatalogService } from './catalog.service';
import { UserService } from '../user/user.service';

@Controller('catalog')
export class CatalogController {
  constructor(
    private readonly catalogService: CatalogService,
    private readonly userService: UserService,
  ) {}

  @Get(':telegramId')
  async getCategoryList(
    @Param('telegramId') telegramId: string,
  ): Promise<CatalogModule> {
    const user = await this.userService.getUser({
      telegramId: telegramId,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован');
    }

    const categories = await this.catalogService.getCategories();

    if (!categories) {
      throw new NotFoundException('Category not Found');
    }

    return categories;
  }
}
