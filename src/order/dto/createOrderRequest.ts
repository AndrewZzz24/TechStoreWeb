import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderRequest {
  @ApiProperty()
  readonly customerUsername: string;
  @ApiProperty()
  readonly productIds: string[];
  @ApiProperty()
  readonly totalPrice: number;
  @ApiProperty()
  readonly info?: string;
}
