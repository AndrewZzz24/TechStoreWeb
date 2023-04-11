import { ApiProperty } from '@nestjs/swagger';

export class SupportRequest {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly usernameInitiator: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  info: string;

  constructor(id: number, usernameInitiator: string, title: string, info: string) {
    this.id = id;
    this.usernameInitiator = usernameInitiator;
    this.title = title;
    this.info = info;
  }
}
