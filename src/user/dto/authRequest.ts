import { ApiProperty } from '@nestjs/swagger';

export class AuthRequest {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly password: string;
}
