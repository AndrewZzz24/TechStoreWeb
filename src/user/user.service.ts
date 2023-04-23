import { Injectable, NotImplementedException } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { PrismaService } from "../prisma.service";
import { SiteUserData, User, UserRole } from "@prisma/client";
import { CreateUserRequest } from "./dto/CreateUserRequest";
import { OrderDto } from "../order/dto/order.dto";
import { SupportRequest } from "../support/dto/supportRequest.dto";
import { CartDto } from "../cart/dto/cart.dto";
import { RuntimeException } from "@nestjs/core/errors/exceptions";
import { ProductDto } from "../products/dto/product.dto";

// const prisma = new PrismaClient()
@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {
  }

  async getUser(
    username: string
  ): Promise<UserDto> {
    const siteUserData: SiteUserData = await this.getSiteUserData(username)
    const user: User = await this.getUserData(siteUserData)

    return this.toUserDto(user, siteUserData);
  }

  async createUser(createUserRequest: CreateUserRequest, role: UserRole): Promise<UserDto> {
    if (!this.validateRequest(createUserRequest)) {
      throw new RuntimeException("invalid request input");
    }

    const siteUserData = await this.prisma.siteUserData.create({
      data: {
        email: createUserRequest.email,
        username: createUserRequest.username,
        password: createUserRequest.password,
        name: createUserRequest.name,
        surname: createUserRequest.surname,
        role: role
      }
    });

    const user = await this.prisma.user.create({
      data: {
        siteUserDataId: Number(siteUserData.id)
      }
    });
    return this.toUserDto(user, siteUserData);
  }

  async deleteUser(username: string): Promise<boolean> {
    const userData: SiteUserData = await this.getSiteUserData(username)

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

    return deletedUser != null && deletedUserData != null;
  }


  async getUserCart(username: string): Promise<CartDto> {
    const customerData = await this.getUser(username)

    const cart = await this.prisma.cart.findUnique({
      where: {
        userId: Number(customerData.id)
      }
    });

    const cardProductItemIds = (await this.prisma.cartProductItem.findMany({
      where: {
        cartId: Number(cart.id)
      }
    })).map(function(value) {
      return value.id.toString();
    });

    return new CartDto(
      cart.id,
      customerData.username,
      cart.createdAt.toString(),
      cardProductItemIds,
      cart.totalPrice,
    );
  }

  async getUserOrders(username: string): Promise<OrderDto[]> {
    const customerUser: UserDto = await this.getUser(username)
    const orders = await this.prisma.order.findMany({
      where: {
        userId: Number(customerUser.id)
      }
    })

    let result: OrderDto[] = [];
    for (const order of orders) {
      const orderLines = await this.prisma.orderLine.findMany({
        where: {
          orderId: Number(order.id)
        }
      });

      result.push(
        new OrderDto(

        )
      );
    }
    return result;
  }

  getUserSupportRequests(username: string): SupportRequest[] {
    throw new NotImplementedException();
  }

  private toUserDto(user: User, siteUserData: SiteUserData): UserDto {
    return new UserDto(
      user.id,
      siteUserData.email,
      siteUserData.username,
      siteUserData.password,
      siteUserData.name,
      siteUserData.surname,
      siteUserData.role
    );
  }

  private async getSiteUserData(username: string): Promise<SiteUserData> {
    return this.prisma.siteUserData.findUnique({
      where: {
        username: username
      }
    });
  }

  private async getUserData(siteUserData: SiteUserData): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        siteUserDataId: Number(siteUserData.id)
      }
    });
  }

  private validateRequest(createUserRequest: CreateUserRequest): boolean {
    return true;
  }
}
