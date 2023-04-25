import { Injectable } from "@nestjs/common";
import { CartDto } from "./dto/cart.dto";
import { CreateCartRequest } from "./dto/createCartRequest";
import { Cart } from "@prisma/client";
import { RuntimeException } from "@nestjs/core/errors/exceptions";
import { PrismaService } from "../prisma.service";

@Injectable()
export class CartService {

  constructor(
    private prisma: PrismaService,
  ) {
  }

  async getCart(cartId: string): Promise<CartDto> {
    const cart = await this.prisma.cart.findFirst({
      where: {
        id: Number(cartId)
      }
    });
    const items = await this.prisma.cartProductItem.findMany({
      where: {
        cartId: cart.id
      }
    })

    return this.toCartDto(cart, items.map((value) => value.shopProductItemId.toString()));
  }

  async createCart(createCartRequest: CreateCartRequest): Promise<CartDto> {
    if (!this.validateRequest()) {
      throw new RuntimeException("invalid request input");
    }

    const time = new Date().toISOString();
    const cart = await this.prisma.cart.create({
      data: {
        createdAt: time,
        userId: createCartRequest.userId
      }
    });
    return this.toCartDto(cart, []);
  }

  async deleteCart(cartId: string): Promise<boolean> {
    const deletedCart = await this.prisma.cart.delete({
      where: {
        id: Number(cartId)
      }
    });

    return deletedCart != null;
  }

  async getUserCart(userId: string): Promise<CartDto> {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId: Number(userId)
      }
    });

    const cartProductItemIds: string[] = (await this.prisma.cartProductItem.findMany({
      where: {
        cartId: Number(cart.id)
      }
    })).map(function(value) {
      return value.id.toString();
    });

    return this.toCartDto(cart, cartProductItemIds);
  }

  private toCartDto(cart: Cart, cartProductItemIds: string[]): CartDto {
    return new CartDto(
      cart.id,
      cart.userId,
      cart.createdAt.toString(),
      cartProductItemIds,
    );
  }

  private validateRequest(): boolean {
    return true;
  }
}
