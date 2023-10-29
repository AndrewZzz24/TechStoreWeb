import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { PrismaService } from "../prisma.service";

@Module({
  imports: [],
  controllers: [CartController],
  providers: [
    CartService,
    PrismaService,
  ]
})
export class CartModule {
}
