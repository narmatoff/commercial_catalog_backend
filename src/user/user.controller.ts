import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Post('update')
  async updateUser(@Body() body: UpdateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Get(':telegramId')
  async getUser(@Param('telegramId') telegramId: string): Promise<User> {
    return this.userService.getUser({
      telegramId: telegramId,
    });
  }
}
