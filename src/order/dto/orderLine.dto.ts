import { ApiProperty } from "@nestjs/swagger";

export class OrderLineDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly orderId: number;
  @ApiProperty()
  readonly tax: number;
  @ApiProperty()
  readonly discount: number;
  @ApiProperty()
  readonly customerUsername: string;
  @ApiProperty()
  readonly productId: string[];

  constructor(
    id: number,
    customerUsername: string,
    createAt: string,
    productIds: string[],
    totalPrice: number,
    info?: string
  ) {

  }
}
