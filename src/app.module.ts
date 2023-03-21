import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ServerTimeInterceptor } from './logging.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ServerTimeInterceptor,
    },
    {
      provide: AppService,
      useClass: AppService,
    },
  ],
})
export class AppModule {}
