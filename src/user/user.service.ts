import { Injectable } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { PrismaService } from "../prisma.service";
import { SiteUserData, User, UserRole } from "@prisma/client";
import { CreateUserRequest } from "./dto/CreateUserRequest";
import { AuthRequest } from "./dto/authRequest";

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {
  }

  async getUser(
    username: string
  ): Promise<UserDto> {
    const siteUserData: SiteUserData = await this.getSiteUserDataByUsername(username);
    if (siteUserData == null) return null;
    const user: User = await this.getUserBySiteUserData(siteUserData);

    return this.toUserDto(user, siteUserData);
  }

  async createUser(createUserRequest: CreateUserRequest, role: UserRole): Promise<UserDto> {
    if (!this.validateRequest(createUserRequest)) {
      return null;
    }
    if (await this.getSiteUserDataByUsername(createUserRequest.username) !== null || await this.getSiteUserDataByEmail(createUserRequest.email) !== null) {
      alert("User with this email or username already exists");
      return null;
    }
    const siteUserData = await this.prisma.siteUserData.create({
      data: {
        email: createUserRequest.email.toString(),
        username: createUserRequest.username.toString(),
        password: createUserRequest.password.toString(),
        name: createUserRequest.name.toString(),
        surname: createUserRequest.surname.toString(),
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

  async auth(authRequest: AuthRequest): Promise<UserDto> {
    const siteUserData: SiteUserData = await this.getSiteUserDataByUsername(authRequest.username);
    if (siteUserData == null || siteUserData.password != authRequest.password) return null;

    const user: User = await this.getUserBySiteUserData(siteUserData);

    return this.toUserDto(user, siteUserData);
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
    if (createUserRequest.surname.match(/^[a-zA-Zа-яА-Я\s]*$/) ||
      createUserRequest.name.match(/^[a-zA-Zа-яА-Я\s]*$/) ||
      createUserRequest.username.match(/^[a-zA-Z\s]*$/)
    ) {
      alert("surname and name should contain only letters; username must contain english letters only");
      return false;
    } else {
      return true;
    }
  }
}
