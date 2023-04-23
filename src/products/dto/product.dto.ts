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

  constructor(id: number, name: string, description: string, categories: string[], price: number, info: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.info = info;
  }
}
