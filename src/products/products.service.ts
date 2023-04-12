import { Injectable, NotImplementedException } from "@nestjs/common";
import { ProductDto } from "./dto/product.dto";
import { PrismaService } from "../prisma.service";
import { UserDto } from "../user/dto/user.dto";
import { HelpDeskSupportRequestStatus } from "@prisma/client";
import { SupportRequest } from "../support/dto/supportRequest.dto";

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) {
  }

  async getProduct(productId: string): Promise<ProductDto> {
    const product = await this.prisma.shopProductItem.findFirst({
      where: {
        id: Number(productId)
      }
    });

    return new ProductDto(product.id, product.title, product.amountOnWarehouse.toString(), [], product.price, product.createdAt.toString());
  }


  async createProduct(productName: string): Promise<ProductDto> {
    // const product = await this.prisma.shopProductItem.create({
    //   data: {
    //     price: time,
    //   }
    // });
    // return new ProductDto(product.id, product.title, product.amountOnWarehouse.toString(), [], product.price, product.createdAt.toString());
    throw new NotImplementedException()
  }

  deleteProduct(productId: string): Promise<boolean> {
    throw new NotImplementedException();
  }
}
