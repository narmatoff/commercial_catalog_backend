import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Good as GoodModel, User as UserModel } from '@prisma/client';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { GoodModule } from './good/good.module';
import { GoodService } from './good/good.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly goodService: GoodService,
    private readonly userService: UserService,
  ) {}

  @Get('ping')
  getPong(): string {
    return this.appService.getPong();
  }

  @Get('good/:id')
  async getGoodById(@Param('id') id: string): Promise<GoodModule> {
    return this.goodService.good({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedGoods(): Promise<GoodModel[]> {
    return this.goodService.goods({
      where: { published: true },
    });
  }

  @Get('filtered-goods/:searchString')
  async getFilteredPGoods(
    @Param('searchString') searchString: string,
  ): Promise<GoodModel[]> {
    return this.goodService.goods({
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
  }

  @Post('good')
  async createDraft(
    @Body() goodData: { title: string; content?: string; authorEmail: string },
  ): Promise<GoodModel> {
    const { title, content, authorEmail } = goodData;
    return this.goodService.createGood({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('publish/:id')
  async publishGood(@Param('id') id: string): Promise<GoodModel> {
    return this.goodService.updateGood({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('good/:id')
  async deleteGood(@Param('id') id: string): Promise<GoodModel> {
    return this.goodService.deleteGood({ id: Number(id) });
  }
}
