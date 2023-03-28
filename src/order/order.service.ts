import { Injectable, NotImplementedException } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  getOrder(orderId: string): OrderDto {
    throw NotImplementedException;
  }

  createOrder(orderName: string): OrderDto {
    throw NotImplementedException;
  }

  deleteOrder(orderId: string): boolean {
    throw NotImplementedException;
  }
}
