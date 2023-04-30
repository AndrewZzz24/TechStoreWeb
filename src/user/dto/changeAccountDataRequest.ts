import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ChangeAccountDataRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly changedPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly changedName: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly changedSurname: string;
}
