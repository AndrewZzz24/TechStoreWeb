import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserRequest {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly surname: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;
}
