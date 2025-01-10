import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(body);
  }

  @Post('update')
  async updateUser(@Body() body: UpdateUserDto): Promise<UserModel> {
    // console.log(typeof body.telegramId);
    // body.telegramId = body.telegramId;
    // console.log(typeof body.telegramId);

    return this.userService.createUser(body);
  }

  @Get()
  async getUser(@Body() data: GetUserDto): Promise<UserModel> {
    console.log('data.telegramId: ', data.telegramId);

    const user = await this.userService.user({
      telegramId: data.telegramId,
    });
    if (!user) {
      throw new NotFoundException('Not found');
    }

    return this.userService.user({
      telegramId: data.telegramId,
    });
  }
}
