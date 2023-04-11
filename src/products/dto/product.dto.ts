import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly categories: string[];
  @ApiProperty()
  readonly price: number;
  @ApiProperty()
  readonly info: string;

  constructor(id: number, name: string, description: string, categories: string[], price: number, info: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.info = info;
  }
}
