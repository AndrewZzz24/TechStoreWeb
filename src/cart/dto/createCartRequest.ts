import { ApiProperty } from '@nestjs/swagger';

export class CreateCartRequest {
  @ApiProperty()
  readonly customerUsername: string;
  @ApiProperty()
  readonly info?: string;
}
