import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  imports: [],
  controllers: [CartController],
  providers: [
    {
      provide: CartService,
      useClass: CartService,
    },
  ],
})
export class CartModule {}
