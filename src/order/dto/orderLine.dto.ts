import { ApiProperty } from "@nestjs/swagger";

export class OrderLineDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly orderId: number;
  @ApiProperty()
  readonly tax: number;
  @ApiProperty()
  readonly totalAmount: number;
  @ApiProperty()
  readonly discount: number;
  @ApiProperty()
  readonly orderProductId: string[];

  constructor(
    id: number,
    orderId: number,
    tax: number,
    totalAmount: number,
    discount: number,
    orderProductId: string[]
  ) {
    this.id = id;
    this.orderId = orderId;
    this.tax = tax;
    this.totalAmount = totalAmount;
    this.discount = discount;
    this.orderProductId = orderProductId;
  }
}
