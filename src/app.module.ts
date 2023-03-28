import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ServerTimeInterceptor } from './serverTime.interceptor';

import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';
import { ProfileModule } from './profile/profile.module';
import { SupportModule } from './support/support.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    OrderModule,
    ProductsModule,
    ProfileModule,
    SupportModule,
    UserModule,
  ],
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
