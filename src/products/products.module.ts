import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from "../prisma.service";

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [
    {
      provide: ProductsService,
      useClass: ProductsService,
    },
    {
      provide: PrismaService,
      useClass: PrismaService,
    },
  ],
})
export class ProductsModule {}
