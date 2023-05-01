import { Get, Post, Delete, Param, Controller, Body } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { CreateOrderRequest } from "./dto/createOrderRequest";

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
    type: OrderDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('/:orderId')
  async getOrder(@Param('orderId') orderId: string): Promise<OrderDto> {
    return this.orderService.getOrder(orderId);
  }

  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: OrderDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('create-order')
  async createOrder(
    @Body() createOrderRequest: CreateOrderRequest,
  ): Promise<OrderDto> {
    return this.orderService.createOrder(createOrderRequest);
  }

  @ApiOperation({ summary: 'Delete order' })
  @ApiParam({ name: 'orderId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully deleted',
    type: Boolean,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete('/:orderId')
  async deleteOrder(@Param('orderId') orderId: string): Promise<boolean> {
    return this.orderService.deleteOrder(orderId);
  }
}
