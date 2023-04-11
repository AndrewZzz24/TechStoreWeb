import { Injectable, NotImplementedException } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  getOrder(orderId: string): OrderDto {
    throw new NotImplementedException();
  }

  createOrder(orderName: string): OrderDto {
    throw new NotImplementedException();
  }

  deleteOrder(orderId: string): boolean {
    throw new NotImplementedException();
  }
}
