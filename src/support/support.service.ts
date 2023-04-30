import { Injectable } from "@nestjs/common";
import { SupportRequest } from "./dto/supportRequest.dto";
import { PrismaService } from "../prisma.service";
import { HelpDeskSupportRequest, HelpDeskSupportRequestStatus } from "@prisma/client";
import { CreateSupportRequest } from "./dto/createSupportRequest";
import { RuntimeException } from "@nestjs/core/errors/exceptions";

@Injectable()
export class SupportService {

  constructor(private prisma: PrismaService) {
  }

  async getRequest(requestId: string): Promise<SupportRequest> {
    const supportRequest = await this.prisma.helpDeskSupportRequest.findFirst({
      where: {
        id: Number(requestId)
      }
    });

    return this.toSupportRequest(supportRequest);
  }

  async createRequest(
    createSupportRequest: CreateSupportRequest
  ): Promise<SupportRequest> {
    if (!this.validateRequest(createSupportRequest)) {
      throw new RuntimeException("invalid request input");
    }
    const time = new Date().toISOString();
    const supportRequestDb = await this.prisma.helpDeskSupportRequest.create({
      data: {
        createdAt: time,
        title: createSupportRequest.title,
        message: createSupportRequest.message,
        status: HelpDeskSupportRequestStatus.CREATED,
        userId: createSupportRequest.userId
      }
    });
    return this.toSupportRequest(supportRequestDb);
  }

  async deleteRequest(requestId: string): Promise<boolean> {
    const deletedSupportRequest = await this.prisma.helpDeskSupportRequest.delete({
      where: {
        id: Number(requestId)
      }
    });

    return deletedSupportRequest != null;
  }

  async getUserSupportRequests(userId: string, cursor: number, limit: number): Promise<SupportRequest[]> {
    const supportRequests = await this.prisma.helpDeskSupportRequest.findMany({
      skip: cursor * limit,
      where: {
        userId: Number(userId)
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

  private validateRequest(createSupportRequest: CreateSupportRequest): boolean {
    return true;
  }
}
