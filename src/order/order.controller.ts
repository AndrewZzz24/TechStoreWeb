import { Get, Post, Delete, Param, Controller } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Get order' })
  @ApiParam({ name: 'orderId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully found.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('get_order/:orderId')
  async getOrder(@Param('orderId') orderId: string): Promise<OrderDto> {
    return this.orderService.getOrder(orderId);
  }

  @ApiOperation({ summary: 'Create order' })
  @ApiParam({ name: 'uid', type: 'string' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('create_order/:uid')
  async createOrder(@Param(':uid') orderName: string): Promise<OrderDto> {
    return this.orderService.createOrder(orderName);
  }

  @ApiOperation({ summary: 'Delete order' })
  @ApiParam({ name: 'orderId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully deleted',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete('delete_order/:orderId')
  async deleteOrder(@Param('orderId') orderId: string): Promise<boolean> {
    return this.orderService.deleteOrder(orderId);
  }
}
