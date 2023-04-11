import { Injectable, NotImplementedException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  getProduct(productId: string): Promise<ProductDto> {
    throw new NotImplementedException();
  }

  createProduct(productName: string): Promise<ProductDto> {
    throw new NotImplementedException();
  }

  deleteProduct(productId: string): Promise<boolean> {
    throw new NotImplementedException();
  }
}
