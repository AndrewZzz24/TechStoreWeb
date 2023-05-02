import { Injectable, NotImplementedException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { CreateProductRequest } from './dto/createProductRequest';

@Injectable()
export class ProductsService {
  getProduct(productId: string): Promise<ProductDto> {
    throw new NotImplementedException();
  }

  createProduct(
    createProductRequest: CreateProductRequest,
  ): Promise<ProductDto> {
    throw new NotImplementedException();
  }

  deleteProduct(productId: string): Promise<boolean> {
    throw new NotImplementedException();
  }

  getAllAvailableProducts(): Promise<ProductDto[]> {
    throw new NotImplementedException();
  }
}
