import { Injectable, NotImplementedException } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { PrismaService } from "../prisma.service";
import { CreateUserRequest } from './dto/CreateUserRequest';
import { OrderDto } from '../order/dto/order.dto';
import { SupportRequest } from '../support/dto/supportRequest.dto';
import { CartDto } from '../cart/dto/cart.dto';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {
  }

  async getUser(
    uid: string
  ): Promise<UserDto> {
    const userData = await this.prisma.siteUserData.findFirst({
      where: {
        username: uid
      }
    });
    const user = await this.prisma.user.findFirst({
      where: {
        siteUserDataId: userData.id
      }
    });

    return new UserDto(user.id, userData.username, userData.password, userData.email);
  }

  async createUser(uid: string): Promise<UserDto> {
    let email: string = uid + "@techstore.ru";
    const siteUserData = await this.prisma.siteUserData.create({
      data: {
        email: email,
        name: uid,
        username: uid,
        password: "asd",
        role: "USER"
      }
    });

    const user = await this.prisma.user.create({
      data: {
        siteUserDataId: Number(siteUserData.id)
      }
    });
    return new UserDto(user.id, siteUserData.username, siteUserData.password, siteUserData.email);
  }

  async deleteUser(uid: string): Promise<boolean> {
    const userData = await this.prisma.siteUserData.findFirst({
      where: {
        username: uid
      }
    });

    if (userData == null) return false;

    const deletedUser = await this.prisma.user.delete({
      where: {
        siteUserDataId: Number(userData.id)
      }
    });

    const deletedUserData = await this.prisma.siteUserData.delete({
      where: {
        id: Number(userData.id)
      }
    });

    return true;
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
