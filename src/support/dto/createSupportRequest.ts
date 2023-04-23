import { ApiProperty } from '@nestjs/swagger';

export class CreateSupportRequest {
  @ApiProperty()
  readonly usernameInitiator: string;
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly message: string;
  @ApiProperty()
  readonly info?: string;
}
