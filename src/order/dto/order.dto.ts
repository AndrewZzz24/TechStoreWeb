import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly customerUsername: string;
  @ApiProperty()
  readonly createAt: string;
  @ApiProperty()
  readonly products: string[];
  @ApiProperty()
  readonly price: number;
  @ApiProperty()
  readonly info: string;
}
