import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @  데코레이터

// :  typescript
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/aaa') //localhost3000:/aaa
  getHello(): string {
    return this.appService.aaa();
  }
}
