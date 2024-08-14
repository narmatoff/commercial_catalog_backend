import { Body, Controller, Post } from '@nestjs/common';
import { User as UserModel } from '.prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private readonly userService: UserService;

  @Post()
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
