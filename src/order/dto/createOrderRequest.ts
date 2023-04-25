import { ApiProperty } from '@nestjs/swagger';
import { OrderLineDto } from "./orderLine.dto";

export class CreateOrderRequest {
  @ApiProperty()
  readonly userId: number;
  @ApiProperty()
  readonly orderLines: OrderLineDto[];
  @ApiProperty()
  readonly totalPrice: number;
  @ApiProperty()
  readonly cartId: number;
}
