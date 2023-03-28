import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [
    {
      provide: ProductsService,
      useClass: ProductsService,
    },
  ],
})
export class ProductsModule {}
