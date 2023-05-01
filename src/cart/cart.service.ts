import { Injectable } from "@nestjs/common";
import { CartDto } from "./dto/cart.dto";
import { CreateCartRequest } from "./dto/createCartRequest";
import { Cart } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import {
  CartAlreadyExistsException,
  CartNotFoundException,
  InvalidCreateCartRequestException
} from "./utils/exceptions";

@Injectable()
export class CartService {

  constructor(
    private prisma: PrismaService
  ) {
  }

  async getCart(cartId: string): Promise<CartDto> {
    const cart = await this.prisma.cart.findUnique({
      where: {
        id: Number(cartId)
      }
    });
    if (cart == null) {
      throw new CartNotFoundException("no cart with such id");
    }
    const items = await this.prisma.cartProductItem.findMany({
      where: {
        cartId: cart.id
      }
    });

    return this.toCartDto(cart, items.map((value) => value.shopProductItemId.toString()));
  }

  async createCart(createCartRequest: CreateCartRequest): Promise<CartDto> {
    await this.validateRequest(createCartRequest);

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
    if (await this.prisma.cart.findUnique({ where: { id: Number(cartId) } }) == null) {
      throw new CartNotFoundException("no cart with such id");
    }

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

    if (cart === null) {
      throw new CartNotFoundException(`no cart for such user = ${userId}`);
    }

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
      cartProductItemIds
    );
  }

  private async validateRequest(createCartRequest: CreateCartRequest) {
    if (await this.prisma.user.findUnique({ where: { id: createCartRequest.userId } }) === null) {
      throw new InvalidCreateCartRequestException("no such user registered");
    }

    if (await this.prisma.cart.findUnique({ where: { id: createCartRequest.userId } }) !== null) {
      throw new CartAlreadyExistsException("cart for this user already exists");
    }
  }
}
