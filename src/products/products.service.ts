import { Injectable } from "@nestjs/common";
import { ProductDto } from "./dto/product.dto";
import { PrismaService } from "../prisma.service";
import { ShopProductItem } from "@prisma/client";
import { CreateProductRequest } from "./dto/createProductRequest";

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
    const categories = await this.prisma.category.findMany({
      where: {
        shopProductItemId: Number(productId)
      }
    });

    return new ProductDto(
      product.id,
      "sd",
      product.title,
      product.price,
      product.amountOnWarehouse.toString(),
      "",
      categories.map(it.toString),
      null
    );
  }

  async createProduct(createProductRequest: CreateProductRequest): Promise<ProductDto> {
    const product = await this.prisma.shopProductItem.create({
      data: {
        price: createProductRequest.price,
        title: createProductRequest.title,
        amountOnWarehouse: createProductRequest.amountOnWarehouse,
      }
    });
    for (const category of createProductRequest.categories) {
      await this.prisma.category.create({
        data: {
          description: category.toString(),
          shopProductItemId: product.id
        }
      });
      return new ProductDto(
        product.id,
        "sd",
        product.title,
        product.price,
        product.amountOnWarehouse.toString(),
        "",
        createProductRequest.categories,
        null
      );
    }
  }

  async deleteProduct(productId: string): Promise<boolean> {
    const categories = await this.prisma.shopProductItem.delete({
      where: {
        id: Number(productId)
      }
    });
    return categories != null;
  }

  async getAllAvailableProducts(): Promise<ProductDto[]> {
    const products: ShopProductItem[] = await this.prisma.shopProductItem.findMany({});
    let result: ProductDto[] = [];
    for (const product of products) {
      const categories = await this.prisma.category.findMany({
        where: {
          shopProductItemId: Number(product.id)
        }
      });

      result.push(
        new ProductDto(
          product.id,
          "sd",
          product.title,
          product.price,
          product.amountOnWarehouse.toString(),
          "",
          categories.map(it.toString),
          null
        )
      );
    }
    return result;
  }
}
