import { ApiProperty } from "@nestjs/swagger";

export class CartDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly customerUsername: string;
  @ApiProperty()
  readonly createAt: string;
  @ApiProperty()
  readonly productIds: string[];
  @ApiProperty()
  readonly totalPrice: number;

  constructor(
    id: number,
    customerUsername: string,
    createAt: string,
    productIds: string[],
    totalPrice: number
  ) {
    this.id = id;
    this.customerUsername = customerUsername;
    this.createAt = createAt;
    this.productIds = productIds;
    this.totalPrice = totalPrice;
  }
}
