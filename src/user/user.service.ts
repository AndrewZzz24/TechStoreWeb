import { Injectable, NotImplementedException } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { PrismaService } from "../prisma.service";
import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient()
@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async getUser(
    uid: string
  ): Promise<UserDto> {
    const posts = await this.prisma.user.findMany();
    throw new NotImplementedException();
  }

  async createUser(uid: string): Promise<UserDto> {

    const siteUserData = await this.prisma.siteUserData.create({
      data: {
        email: "uid@techstore.ru",
        name: uid,
        username: uid,
        password: "asd",
        role: "asd"
      }
    });

    const user = await this.prisma.user.create({
      data: {
        siteUserDataId: siteUserData.id
      }
    });
    return new UserDto();
  }

  async deleteUser(uid: string): Promise<boolean> {
    const post = await this.prisma.user.delete({

      where: {

        siteUserDataId: Number(id),

      },

    })

  }
}
