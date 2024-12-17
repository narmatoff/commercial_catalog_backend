import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // ping
  @Get('ping')
  getPong(): string {
    return this.appService.getPong();
  }
}
