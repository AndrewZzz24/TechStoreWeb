import { Get, Post, Delete, Param, Controller, Body } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { CreateProductRequest } from './dto/createProductRequest';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get product' })
  @ApiParam({ name: 'productId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully found.',
    type: ProductDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('/:productId')
  async getProduct(@Param('productId') productId: string): Promise<ProductDto> {
    return this.productsService.getProduct(productId);
  }

  @ApiOperation({ summary: 'Create product' })
  @ApiParam({ name: 'createProductRequest', type: CreateProductRequest })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: ProductDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('/create-product')
  async createProduct(
    @Body() createProductRequest: CreateProductRequest,
  ): Promise<ProductDto> {
    return this.productsService.createProduct(createProductRequest);
  }

  @ApiOperation({ summary: 'Delete product' })
  @ApiParam({ name: 'productId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted',
    type: Boolean,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Product Not Found' })
  @Delete('/:productId')
  async deleteProduct(@Param('productId') productId: string): Promise<boolean> {
    return this.productsService.deleteProduct(productId);
  }

  @ApiOperation({ summary: 'Get all available products' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully found.',
    type: Array<ProductDto>,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('/get-all-available-products')
  async getAllProducts(): Promise<ProductDto[]> {
    return this.productsService.getAllAvailableProducts();
  }
}
