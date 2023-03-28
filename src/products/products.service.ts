import { Injectable, NotImplementedException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  getProduct(productId: string): ProductDto {
    throw NotImplementedException;
  }

  createProduct(productName: string): ProductDto {
    throw NotImplementedException;
  }

  deleteProduct(productId: string): boolean {
    throw NotImplementedException;
  }
}
