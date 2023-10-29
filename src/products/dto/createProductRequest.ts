import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateProductRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly creatorUsername: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  readonly amountOnWarehouse: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  readonly categories: string[];

  @ApiProperty()
  @IsNotEmpty()
  readonly discountPercent?: number;
}
