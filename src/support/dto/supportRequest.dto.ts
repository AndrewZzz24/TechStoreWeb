import { ApiProperty } from '@nestjs/swagger';

export class SupportRequest {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly createdAt: string;
  @ApiProperty()
  readonly usernameInitiator: string;
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly message: string;
  @ApiProperty()
  readonly info?: string;


  constructor(id: number, usernameInitiator: string, title: string, info: string) {
    this.id = id;
    this.usernameInitiator = usernameInitiator;
    this.title = title;
    this.info = info;
  }
}
