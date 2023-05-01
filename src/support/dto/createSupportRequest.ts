import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateSupportRequest {
  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly message: string;
}
