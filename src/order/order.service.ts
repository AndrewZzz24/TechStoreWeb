import { Injectable } from "@nestjs/common";
import { OrderDto } from "./dto/order.dto";
import { CreateOrderRequest } from "./dto/createOrderRequest";
import { UserDto } from "../user/dto/user.dto";
import { PrismaService } from "../prisma.service";
import { UserService } from "../user/user.service";
import { Order, OrderLine } from "@prisma/client";
import { RuntimeException } from "@nestjs/core/errors/exceptions";
import { ProductsService } from "../products/products.service";

@Injectable()
export class OrderService {

  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private productService: ProductsService
  ) {
  }

  async getOrder(orderId: string): Promise<OrderDto> {
    const order = await this.prisma.order.findUnique({
      where: {
        id: Number(orderId)
      }
    });
    const orderLines = await this.prisma.orderLine.findMany({
      where: {
        orderId: Number(order.id)
      }
    });

    return this.toOrderDto(order, orderLines);
  }

  async createOrder(createOrderRequest: CreateOrderRequest): Promise<OrderDto> {
    if (!this.validateRequest(createOrderRequest)) {
      throw new RuntimeException("invalid request input");
    }

    const user = await this.userService.getUser(createOrderRequest.customerUsername);
    const createdOrderLines: OrderLine[] = [];
    for (const orderLine of createOrderRequest.orderLines) {
      const product = await this.productService.getProduct(orderLine.orderLineProductId.toString());
      createdOrderLines.push(await this.prisma.orderLine.create({
        data: {
          orderId: orderLine.orderId,
          tax: orderLine.tax,
          totalAmount: orderLine.totalAmount,
          discount: orderLine.discount,
          productName: product.title
        }
      }));
    }

    const time = new Date().toISOString();
    const order = await this.prisma.order.create({
      data: {
        createdAt: time,
        totalPrice: createOrderRequest.totalPrice,
        cartId: createOrderRequest.cartId,
        userId: user.id
      }
    });
    return this.toOrderDto(order, createdOrderLines);
  }

  async deleteOrder(orderId: string): Promise<boolean> {
    const deletedUser = await this.prisma.order.delete({
      where: {
        id: Number(orderId)
      }
    });

    return deletedUser != null;
  }

  async getUserOrders(username: string): Promise<OrderDto[]> {
    const customerUser: UserDto = await this.userService.getUser(username);
    const orders = await this.prisma.order.findMany({
      where: {
        userId: Number(customerUser.id)
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
      order.userId,
      order.totalPrice,
      orderLines.map(function(value) {
        return value.productName;
      }),
      order.cartId
    );
  }

  private validateRequest(createOrderRequest: CreateOrderRequest): boolean {
    return true;
  }
}
