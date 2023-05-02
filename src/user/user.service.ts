import { Injectable, NotImplementedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { CreateUserRequest } from './dto/CreateUserRequest';
import { OrderDto } from '../order/dto/order.dto';
import { SupportRequest } from '../support/dto/supportRequest.dto';
import { CartDto } from '../cart/dto/cart.dto';

@Injectable()
export class UserService {
  getUser(uid: string): UserDto {
    throw new NotImplementedException();
  }

  createUser(createUserRequest: CreateUserRequest): UserDto {
    throw new NotImplementedException();
  }

  deleteUser(uid: string): boolean {
    throw new NotImplementedException();
  }

  getUserCart(uid: string): CartDto {
    throw new NotImplementedException();
  }

  getUserOrders(uid: string): OrderDto[] {
    throw new NotImplementedException();
  }

  getUserSupportRequests(uid: string): SupportRequest[] {
    throw new NotImplementedException();
  }
}
