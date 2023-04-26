import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaService } from "../prisma.service";
import { CartService } from "../cart/cart.service";
import { SupportService } from "../support/support.service";
import { OrderService } from "../order/order.service";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, SupportService, OrderService, CartService]
})
export class UserModule {
}
