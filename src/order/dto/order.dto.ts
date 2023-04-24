import { ApiProperty } from "@nestjs/swagger";

export class OrderDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly createAt: string;
  @ApiProperty()
  readonly totalPrice: number;
  @ApiProperty()
  readonly userId: number;
  @ApiProperty()
  readonly productIds: string[];
  @ApiProperty()
  readonly cartId: number;

  constructor(
    id: number,
    createAt: string,
    totalPrice: number,
    userId: number,
    productIds: string[],
    cartId: number
  ) {
    this.id = id;
    this.createAt = createAt;
    this.totalPrice = totalPrice;
    this.userId = userId;
    this.productIds = productIds;
    this.cartId = cartId;
  }
}
