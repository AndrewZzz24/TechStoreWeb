import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequest {
  @ApiProperty()
  readonly creatorUsername: string;
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly price: string;
  @ApiProperty()
  readonly quantity: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly categories: string[];
  @ApiProperty()
  readonly discountPercent?: number;
}
