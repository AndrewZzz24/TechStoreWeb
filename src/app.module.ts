import { HttpStatus, Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR, HttpAdapterHost } from "@nestjs/core";
import { ServerTimeInterceptor } from './serverTime.interceptor';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';
import { SupportModule } from './support/support.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { HttpExceptionFilter } from "./exception.filter";
import { PrismaClientExceptionFilter } from "nestjs-prisma";
import { AuthModule } from './auth/auth.module';
import { AppGatewayModule } from "./appGateway/appGateway.module";

@Module({
  imports: [
    AuthModule.forRoot({
      connectionURI: "https://try.supertokens.com",
      appInfo: {
        appName: "azweb",
        apiDomain: "https://azweb.onrender.com",
        websiteDomain: "https://azweb.onrender.com",
        apiBasePath: "/api",
        websiteBasePath: "/index",
      },
    }),
    CartModule,
    OrderModule,
    ProductsModule,
    SupportModule,
    UserModule,
    AppGatewayModule,
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
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter, {
          // Prisma Error Code: HTTP Status Response
          P2000: HttpStatus.BAD_REQUEST,
          P2002: HttpStatus.CONFLICT,
          P2025: HttpStatus.NOT_FOUND,
        });
      },
      inject: [HttpAdapterHost],
    },
  ],
})
export class AppModule {}
