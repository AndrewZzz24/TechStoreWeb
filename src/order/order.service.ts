import { Injectable } from "@nestjs/common";
import { OrderDto } from "./dto/order.dto";
import { CreateOrderRequest } from "./dto/createOrderRequest";
import { PrismaService } from "../prisma.service";
import { Order, OrderLine } from "@prisma/client";
import { ProductDto } from "../products/dto/product.dto";
import {
  InvalidCreateOrderRequestException,
  OrderAlreadyExistsException,
  OrderNotFoundException
} from "./utils/exceptions";

@Injectable()
export class OrderService {

  constructor(private prisma: PrismaService) {
  }

  async getOrder(orderId: string): Promise<OrderDto> {
    const order = await this.prisma.order.findUnique({
      where: {
        id: Number(orderId)
      }
    });

    if (order == null) {
      throw new OrderNotFoundException(`no order with such orderId= ${orderId}`);
    }

    const orderLines = await this.prisma.orderLine.findMany({
      where: {
        orderId: Number(order.id)
      }
    });

    return this.toOrderDto(order, orderLines);
  }

  async createOrder(createOrderRequest: CreateOrderRequest): Promise<OrderDto> {
    await this.validateRequest(createOrderRequest);
    console.log("ORDERLINES", createOrderRequest.orderLines);

    // const createdOrderLines: OrderLine[] = [];
    // createOrderRequest.orderLines.map(async orderLine => {
    //   const product = await this.getProduct(orderLine.orderLineProductId.toString());
    //   createdOrderLines.push(await this.prisma.orderLine.create({
    //     data: {
    //       orderId: orderLine.orderId,
    //       tax: orderLine.tax,
    //       totalAmount: orderLine.totalAmount,
    //       discount: orderLine.discount,
    //       productName: product.title
    //     }
    //   }));
    // })

    const time = new Date().toISOString();
    const order = await this.prisma.order.create({
      data: {
        createdAt: time,
        totalPrice: createOrderRequest.totalPrice,
        cartId: createOrderRequest.cartId,
        userId: createOrderRequest.userId
      }
    });
    return this.toOrderDto(order, []);
  }

  async deleteOrder(orderId: string): Promise<boolean> {
    if (await this.prisma.order.findUnique({ where: { id: Number(orderId) } }) == null) {
      throw new OrderNotFoundException(`no order with such orderId= ${orderId}`);
    }

    const deletedUser = await this.prisma.order.delete({
      where: {
        id: Number(orderId)
      }
    });

    return deletedUser != null;
  }

  async getUserOrders(userId: string): Promise<OrderDto[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        userId: Number(userId)
      }
    });

    let result: OrderDto[] = [];
    for (const order of orders) {
      const orderLines = await this.prisma.orderLine.findMany({
        where: {
          orderId: Number(order.id)
        }
      });

      result.push(this.toOrderDto(order, orderLines));
    }
    return result;
  }

  private toOrderDto(order: Order, orderLines: OrderLine[]): OrderDto {
    return new OrderDto(
      order.id,
      order.createdAt.toString(),
      order.totalPrice,
      order.userId,
      orderLines.map(function(value) {
        return value.productName;
      }),
      order.cartId
    );
  }

  private async getProduct(productId: string): Promise<ProductDto> {
    const product = await this.prisma.shopProductItem.findFirst({
      where: {
        id: Number(productId)
      }
    });
    const categories = await this.prisma.category.findMany({
      where: {
        shopProductItemId: Number(productId)
      }
    });

    return new ProductDto(
      product.id,
      product.createdAt.toString(),
      product.creatorUsername,
      product.title,
      product.price,
      product.quantity.toString(),
      product.description,
      categories.map(value => value.toString()),
      product.discountPercent
    );
  }

  private async validateRequest(createOrderRequest: CreateOrderRequest) {
    const userId = createOrderRequest.userId;
    const cartId = createOrderRequest.cartId;
    if (await this.prisma.user.findUnique({ where: { id: userId } }) === null) {
      throw new InvalidCreateOrderRequestException("no such user registered");
    }
    if (await this.prisma.cart.findUnique({ where: { id: cartId } }) === null) {
      throw new InvalidCreateOrderRequestException("no such cartId exists");
    }
    if (await this.prisma.order.findUnique({ where: { cartId: cartId } }) !== null) {
      throw new OrderAlreadyExistsException("order for this user and cart already exists");
    }
  }
}
