import { ApiProperty } from '@nestjs/swagger';

export class CreateSupportRequest {
  @ApiProperty()
  readonly userId: number;
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly message: string;
}
