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
}
