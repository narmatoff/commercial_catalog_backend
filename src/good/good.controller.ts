import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Good as GoodModel } from '.prisma/client';
import { GoodService } from './good.service';
import { GoodModule } from './good.module';

@Controller('good')
export class GoodController {
  constructor(private readonly goodService: GoodService) {}

  @Get('/:id')
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

  @Post()
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

  @Put('publish/:id')
  async publishGood(@Param('id') id: string): Promise<GoodModel> {
    return this.goodService.updateGood({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('/:id')
  async deleteGood(@Param('id') id: string): Promise<GoodModel> {
    return this.goodService.deleteGood({ id: Number(id) });
  }
}
