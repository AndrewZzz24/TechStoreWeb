import { Get, Post, Delete, Param, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':products')
  async getProduct(@Param('productId') productId: string): Promise<ProductDto> {
    return this.productsService.getProduct(productId);
  }

  @Post(':products/create-product')
  async createProduct(
    @Param('productName') productName: string,
  ): Promise<ProductDto> {
    return this.productsService.createProduct(productName);
  }

  @Delete(':products/delete-product')
  async deleteProduct(@Param('productId') productId: string): Promise<boolean> {
    return this.productsService.deleteProduct(productId);
  }
}
