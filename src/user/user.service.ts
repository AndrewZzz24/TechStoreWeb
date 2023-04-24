import { Injectable } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { PrismaService } from "../prisma.service";
import { SiteUserData, User, UserRole } from "@prisma/client";
import { CreateUserRequest } from "./dto/CreateUserRequest";
import { OrderDto } from "../order/dto/order.dto";
import { SupportRequest } from "../support/dto/supportRequest.dto";
import { CartDto } from "../cart/dto/cart.dto";
import { RuntimeException } from "@nestjs/core/errors/exceptions";
import { SupportService } from "../support/support.service";
import { OrderService } from "../order/order.service";
import { CartService } from "../cart/cart.service";

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService,
    private supportService: SupportService,
    private orderService: OrderService,
    private cartService: CartService
  ) {
  }

  async getUser(
    username: string
  ): Promise<UserDto> {
    const siteUserData: SiteUserData = await this.getSiteUserDataByUsername(username);
    const user: User = await this.getUserBySiteUserData(siteUserData);

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
    const userData: SiteUserData = await this.getSiteUserDataByUsername(username);

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
    return this.cartService.getUserCart(username);
  }

  async getUserOrders(username: string): Promise<OrderDto[]> {
    return this.orderService.getUserOrders(username);
  }

  async getUserSupportRequests(username: string): Promise<SupportRequest[]> {
    return this.supportService.getUserSupportRequests(username);
  }

  async getSiteUserDataByUsername(username: string): Promise<SiteUserData> {
    return this.prisma.siteUserData.findUnique({
      where: {
        username: username
      }
    });
  }

  async getUserBySiteUserData(siteUserData: SiteUserData): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        siteUserDataId: Number(siteUserData.id)
      }
    });
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

  private validateRequest(createUserRequest: CreateUserRequest): boolean {
    return true;
  }
}
