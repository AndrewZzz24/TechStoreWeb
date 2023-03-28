import { Get, Post, Delete, Param, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@ApiBearerAuth()
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':order')
  async getOrder(@Param('orderId') orderId: string): Promise<OrderDto> {
    return this.orderService.getOrder(orderId);
  }

  @Post(':order/create-order')
  async createOrder(@Param('orderName') orderName: string): Promise<OrderDto> {
    return this.orderService.createOrder(orderName);
  }

  @Delete(':order/delete-order')
  async deleteOrder(@Param('orderId') orderId: string): Promise<boolean> {
    return this.orderService.deleteOrder(orderId);
  }
}
