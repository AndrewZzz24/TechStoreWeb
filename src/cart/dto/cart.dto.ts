import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly customerUsername: string;
  @ApiProperty()
  readonly createAt: string;
  @ApiProperty()
  readonly products: string[];
  @ApiProperty()
  readonly totalPrice: number;
  @ApiProperty()
  readonly info?: string;
}
