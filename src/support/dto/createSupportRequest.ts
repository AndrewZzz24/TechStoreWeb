import { ApiProperty } from '@nestjs/swagger';

export class CreateSupportRequest {
  @ApiProperty()
  readonly customerUsername: string;
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly message: string;
  @ApiProperty()
  readonly info?: string;
}
