import { ApiProperty } from "@nestjs/swagger";
import { HelpDeskSupportRequestStatus } from "@prisma/client";

export class SupportRequest {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly createdAt: string;
  @ApiProperty()
  readonly userId: number;
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly message: string;
  @ApiProperty()
  readonly status: HelpDeskSupportRequestStatus;

  constructor(
    id: number,
    createdAt: string,
    userId: number,
    title: string,
    message: string,
    status: HelpDeskSupportRequestStatus
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.message = message;
    this.status = status;
  }
}
