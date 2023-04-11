import { Injectable } from "@nestjs/common";
import { SupportRequest } from "./dto/supportRequest.dto";
import { RequestSupportRequestDto } from "./dto/requestSupportRequest.dto";
import { PrismaService } from "../prisma.service";
import { HelpDeskSupportRequestStatus } from "@prisma/client";

@Injectable()
export class SupportService {

  constructor(private prisma: PrismaService) {
  }

  async getRequest(requestId: string): Promise<SupportRequest> {
    const supportRequest = await this.prisma.helpDeskSupportHistory.findFirst({
      where: {
        id: Number(requestId)
      }
    });
    return new SupportRequest(supportRequest.id, supportRequest.userId.toString(), supportRequest.topic, supportRequest.status);
  }

  async createRequest(
    username: string,
    supportRequestDto: RequestSupportRequestDto
  ): Promise<SupportRequest> {
    const time = new Date().toISOString();
    const siteUserData = await this.prisma.helpDeskSupportHistory.create({
      data: {
        requestSupportDate: time,
        topic: supportRequestDto.title,
        status: HelpDeskSupportRequestStatus.CREATED,
        userId: supportRequestDto.id
      }
    });
    return new SupportRequest(siteUserData.id, siteUserData.userId.toString(), siteUserData.topic, siteUserData.status);
  }

  async deleteRequest(requestId: string): Promise<boolean> {
    const deletedUser = await this.prisma.helpDeskSupportHistory.delete({
      where: {
        id: Number(requestId)
      }
    });

    return deletedUser != null;
  }
}
