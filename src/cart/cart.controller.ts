import { Get, Post, Delete, Param, Controller, Body } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';
import { CreateCartRequest } from './dto/createCartRequest';

@ApiBearerAuth()
@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Get cart' })
  @ApiParam({ name: 'cartId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The cart has been successfully found.',
    type: CartDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('/:cartId')
  async getOrder(@Param('cartId') cartId: string): Promise<CartDto> {
    return this.cartService.getCart(cartId);
  }

  @ApiOperation({ summary: 'Create cart' })
  @ApiResponse({
    status: 201,
    description: 'The cart has been successfully created.',
    type: CartDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('create-cart')
  async createOrder(
    @Body() createOrderRequest: CreateCartRequest,
  ): Promise<CartDto> {
    return this.cartService.createCart(createOrderRequest);
  }

  @ApiOperation({ summary: 'Delete cart' })
  @ApiParam({ name: 'cartId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The cart has been successfully deleted',
    type: Boolean,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete('/:cartId')
  async deleteOrder(@Param('cartId') cartId: string): Promise<boolean> {
    return this.cartService.deleteCart(cartId);
  }

  // @ApiOperation({ summary: 'Get user cart' })
  // @ApiParam({ name: 'userId', type: 'string' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The user cart has been successfully found',
  //   type: Boolean,
  // })
  // @ApiResponse({ status: 403, description: 'Forbidden' })
  // @ApiResponse({ status: 404, description: 'Not Found' })
  // @Get('/get-user-cart/:userId')
  // async getUserCart(@Param('userId') cartId: string): Promise<CartDto> {
  //   return this.cartService.getUserCart(cartId);
  // }
}
