import { ApiProperty } from '@nestjs/swagger';
import { OrderLineDto } from "./orderLine.dto";
import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateOrderRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly userId: number;

  @ApiProperty()
  readonly orderLines: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly totalPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly cartId: number;
}
