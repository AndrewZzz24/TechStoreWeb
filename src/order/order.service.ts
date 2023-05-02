import { Injectable, NotImplementedException } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { CreateOrderRequest } from './dto/createOrderRequest';

@Injectable()
export class OrderService {
  getOrder(orderId: string): OrderDto {
    throw new NotImplementedException();
  }

  createOrder(createOrderRequest: CreateOrderRequest): OrderDto {
    throw new NotImplementedException();
  }

  deleteOrder(orderId: string): boolean {
    throw new NotImplementedException();
  }
}
