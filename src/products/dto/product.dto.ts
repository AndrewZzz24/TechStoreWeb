import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly creatorUsername: string;
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly price: number;
  @ApiProperty()
  readonly quantity: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly categories: string[];
  @ApiProperty()
  readonly discountPercent?: number;
}
