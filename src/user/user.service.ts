import { Injectable } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { PrismaService } from "../prisma.service";
import { SiteUserData, User, UserRole } from "@prisma/client";
import { CreateUserRequest } from "./dto/CreateUserRequest";
import { AuthRequest } from "./dto/authRequest";
import { SupportService } from "../support/support.service";
import { SupportRequest } from "../support/dto/supportRequest.dto";
import { OrderService } from "../order/order.service";
import { OrderDto } from "../order/dto/order.dto";
import { CartService } from "../cart/cart.service";
import { CartDto } from "../cart/dto/cart.dto";
import {
  InvalidNameException, InvalidPasswordException,
  InvalidSurnameException,
  InvalidUsernameException,
  UserAlreadyExistsException,
  UserNotFoundException
} from "./exceptions/exceptions";
import { ChangeAccountDataRequest } from "./dto/changeAccountDataRequest";
import { JwtService } from "@nestjs/jwt";
import { InvalidCreateSupportRequestRequestException } from "../support/utils/exceptions";

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService,
    private supportService: SupportService,
    private orderService: OrderService,
    private cartService: CartService,
  ) {
  }

  async getUser(
    username: string
  ): Promise<UserDto> {
    const siteUserData: SiteUserData = await this.getSiteUserDataByUsername(username);
    if (siteUserData == null) {
      throw new UserNotFoundException(`No user with such username=${username} found1`);
    }
    const user: User = await this.getUserBySiteUserData(siteUserData);
    return this.toUserDto(user, siteUserData);
  }

  async createUser(createUserRequest: CreateUserRequest, role: UserRole): Promise<UserDto> {
    await this.validateRequest(createUserRequest);

    const siteUserData = await this.prisma.siteUserData.create({
      data: {
        email: createUserRequest.email.toString(),
        username: createUserRequest.username.toString(),
        password: createUserRequest.password.toString(),
        surname: createUserRequest.surname.toString(),
        name: createUserRequest.name.toString(),
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

  async deleteUser(email: string): Promise<boolean> {
    const userData: SiteUserData = await this.getSiteUserDataByEmail(email);

    if (userData == null) {
      throw new UserNotFoundException(`No user with such email = '${email}' found2`);
    }

    const user = await this.prisma.user.findUnique({
      where: {
        siteUserDataId: Number(userData.id)
      }
    });

    const deleteFromOrder = await this.prisma.order.deleteMany({
      where: {
        userId: user.id
      }
    });

    const deleteFromCart = await this.prisma.cart.deleteMany({
      where: {
        userId: user.id
      }
    });

    const deleteFromSupport = await this.prisma.helpDeskSupportRequest.deleteMany({
      where: {
        userId: user.id
      }
    });

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

  async auth(authRequest: AuthRequest): Promise<UserDto> {
    const siteUserData: SiteUserData = await this.getSiteUserDataByUsername(authRequest.username);
    if (siteUserData == null || siteUserData.password != authRequest.password) {
      throw new UserNotFoundException("no user with such username and password");
    }

    const user: User = await this.getUserBySiteUserData(siteUserData);
    return this.toUserDto(user, siteUserData)
  }

  async getSiteUserDataByUsername(username: string): Promise<SiteUserData> {
    return this.prisma.siteUserData.findUnique({
      where: {
        username: username
      }
    });
  }

  async getSiteUserDataByEmail(email: string): Promise<SiteUserData> {
    return this.prisma.siteUserData.findUnique({
      where: {
        email: email
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

  async getUserCart(username: string): Promise<CartDto> {
    return this.cartService.getUserCart(username);
  }

  async getUserOrders(username: string): Promise<OrderDto[]> {
    return this.orderService.getUserOrders(username);
  }

  async getUserSupportRequests(email: string, cursor: number, limit: number): Promise<SupportRequest[]> {
    return this.supportService.getUserSupportRequests(email, cursor, limit);
  }

  async changeUserAccountData(email: string, changeAccountDataRequest: ChangeAccountDataRequest): Promise<UserDto> {
    const siteUserData = await this.prisma.siteUserData.findUnique({
      where: {
        email: email
      }
    })
    if (siteUserData === null) {
      throw new InvalidCreateSupportRequestRequestException(`no such user registered email= ${email}`);
    }

    this.validateSurname(changeAccountDataRequest.changedSurname)
    this.validateName(changeAccountDataRequest.changedName)
    const user = await this.prisma.user.findUnique({
      where: {
        siteUserDataId: siteUserData.id
      }
    });
    if (siteUserData.password !== changeAccountDataRequest.oldPassword){
      throw new InvalidPasswordException("old password is incorrect")
    }
    const updatedUserData = await this.prisma.siteUserData.update({
      where: {
        id: user.siteUserDataId
      },
      data: {
        password: changeAccountDataRequest.changedPassword,
        name: changeAccountDataRequest.changedName,
        surname: changeAccountDataRequest.changedSurname
      }
    });
    return this.toUserDto(user, updatedUserData);
  }

  private toUserDto(user: User, siteUserData: SiteUserData): UserDto {
    return new UserDto(
      user.id,
      siteUserData.email,
      siteUserData.username,
      siteUserData.password,
      siteUserData.surname,
      siteUserData.name,
      siteUserData.role
    );
  }

  private async validateRequest(createUserRequest: CreateUserRequest): Promise<void> {
    if (await this.getSiteUserDataByUsername(createUserRequest.username) !== null) {
      throw new UserAlreadyExistsException("User with this username already exists");
    }
    if (await this.getSiteUserDataByEmail(createUserRequest.email) !== null) {
      throw new UserAlreadyExistsException("User with this email already exists");
    }

    // if (!createUserRequest.username.match(/^[a-zA-Z0-9\s]*$/)) {
    //   throw new InvalidSurnameException("username must contain only english letters and digits");
    // }
    // if (!createUserRequest.surname.match(/^[a-zA-Z\s]*$/)) {
    //   throw new InvalidSurnameException("surname must contain only english letters");
    // }
    // if (!createUserRequest.name.match(/^[a-zA-Z\s]*$/)) {
    //   throw new InvalidSurnameException("name must contain only english letters");
    // }
    this.validateUsername(createUserRequest.username)
    this.validateSurname(createUserRequest.surname)
    this.validateName(createUserRequest.name)
  }

  private validateUsername(username: string){
    if (!username.match(/^[a-zA-Z0-9\s]*$/)) {
      throw new InvalidSurnameException("username must contain only english letters and digits");
    }
  }

  private validateName(name: string){
    if (!name.match(/^[a-zA-Z\s]*$/)) {
      throw new InvalidNameException("name must contain only english letters");
    }
  }

  private validateSurname(surname: string){
    if (!surname.match(/^[a-zA-Z\s]*$/)) {
      throw new InvalidUsernameException("surname must contain only english letters");
    }
  }
}
