import { Get, Post, Delete, Param, Controller, Body } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get product' })
  @ApiParam({ name: 'productId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully found.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('get_product/:productId')
  async getProduct(@Param('productId') productId: string): Promise<ProductDto> {
    return this.productsService.getProduct(productId);
  }

  @ApiOperation({ summary: 'Create product' })
  @ApiParam({ name: 'productName', type: 'string' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('create_product/:productName')
  async createProduct(@Param('productName') productName: string): Promise<ProductDto> {
    return this.productsService.createProduct(productName);
  }

  @ApiOperation({ summary: 'Delete product' })
  @ApiParam({ name: 'productId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Product Not Found' })
  @Delete('delete_product/:productId')
  async deleteProduct(@Param('productId') productId: string): Promise<boolean> {
    return this.productsService.deleteProduct(productId);
  }
}
