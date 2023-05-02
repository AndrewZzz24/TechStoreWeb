import { Injectable } from "@nestjs/common";
import { SupportRequest } from "./dto/supportRequest.dto";
import { PrismaService } from "../prisma.service";
import { HelpDeskSupportRequest, HelpDeskSupportRequestStatus } from "@prisma/client";
import { CreateSupportRequest } from "./dto/createSupportRequest";
import { InvalidCreateSupportRequestRequestException, SupportRequestNotFoundException } from "./utils/exceptions";

@Injectable()
export class SupportService {

  constructor(private prisma: PrismaService) {
  }

  async getRequest(requestId: string): Promise<SupportRequest> {
    const supportRequest = await this.prisma.helpDeskSupportRequest.findUnique({
      where: {
        id: Number(requestId)
      }
    });

    if (supportRequest == null) {
      throw new SupportRequestNotFoundException(`no support request with such requestId = ${requestId}`);
    }

    return this.toSupportRequest(supportRequest);
  }

  async createRequest(
    email: string,
    createSupportRequest: CreateSupportRequest
  ): Promise<SupportRequest> {
    await this.validateRequest(email);
    const user = await this.prisma.siteUserData.findUnique({
      where: {
        email: email
      }
    })

    const time = new Date().toISOString();
    const supportRequestDb = await this.prisma.helpDeskSupportRequest.create({
      data: {
        createdAt: time,
        title: createSupportRequest.title,
        message: createSupportRequest.message,
        status: HelpDeskSupportRequestStatus.CREATED,
        userId: user.id
      }
    });
    return this.toSupportRequest(supportRequestDb);
  }

  async deleteRequest(requestId: string): Promise<boolean> {
    if (await this.prisma.helpDeskSupportRequest.findUnique({ where: { id: Number(requestId) } }) == null) {
      throw new SupportRequestNotFoundException(`no support request with such requestId = ${requestId}`);
    }

    const deletedSupportRequest = await this.prisma.helpDeskSupportRequest.delete({
      where: {
        id: Number(requestId)
      }
    });

    return deletedSupportRequest != null;
  }

  async getUserSupportRequests(email: string, cursor: number, limit: number): Promise<SupportRequest[]> {
    console.log(`EMAIL === ${email}`)
    const user = await this.prisma.siteUserData.findUnique({
      where: {
        email: email
      }
    })
    if (user === null) {
      throw new InvalidCreateSupportRequestRequestException(`no such user registered email= ${email}`);
    }

    const supportRequests = await this.prisma.helpDeskSupportRequest.findMany({
      skip: cursor * limit,
      where: {
        userId: user.id
      },
      take: limit + 1
    });
    return supportRequests.map(function(value) {
      return new SupportRequest(
        value.id,
        value.createdAt.toString(),
        value.userId,
        value.title,
        value.message,
        value.status
      );
    });
  }

  private toSupportRequest(value: HelpDeskSupportRequest): SupportRequest {
    return new SupportRequest(
      value.id,
      value.createdAt.toString(),
      value.userId,
      value.title,
      value.message,
      value.status
    );
  }

  private async validateRequest(email: string) {
    if (await this.prisma.siteUserData.findUnique({ where: { email: email } }) === null) {
      throw new InvalidCreateSupportRequestRequestException("no such user registered");
    }
  }
}
