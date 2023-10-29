import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateCartRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly userId: number;
}
