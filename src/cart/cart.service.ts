import { Injectable, NotImplementedException } from '@nestjs/common';
import { CartDto } from "./dto/cart.dto";
import { CreateCartRequest } from "./dto/createCartRequest";

@Injectable()
export class CartService {
  getCart(cartId: string): Promise<CartDto> {
    throw new NotImplementedException();
  }

  createCart(createCartRequest: CreateCartRequest): Promise<CartDto> {
    throw new NotImplementedException();
  }

  deleteCart(cartId: string): Promise<boolean> {
    throw new NotImplementedException();
  }
}
