import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
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
  @ApiProperty()
  readonly info?: string;
}
