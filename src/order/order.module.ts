import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    {
      provide: OrderService,
      useClass: OrderService,
    },
  ],
})
export class OrderModule {}
