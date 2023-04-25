import { ApiProperty } from '@nestjs/swagger';

export class CreateCartRequest {
  @ApiProperty()
  readonly userId: number;
}
