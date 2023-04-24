import { ApiProperty } from "@nestjs/swagger";

export class CartDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly userId: number;
  @ApiProperty()
  readonly createAt: string;
  @ApiProperty()
  readonly productIds: string[];

  constructor(
    id: number,
    userId: number,
    createAt: string,
    productIds: string[],
  ) {
    this.id = id;
    this.userId = userId;
    this.createAt = createAt;
    this.productIds = productIds;
  }
}
