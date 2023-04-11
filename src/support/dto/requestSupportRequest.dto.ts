import { ApiProperty } from '@nestjs/swagger';

export class RequestSupportRequestDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly usernameInitiator: string;
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly info: string;
}
