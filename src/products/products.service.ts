import { Injectable } from "@nestjs/common";
import { ProductDto } from "./dto/product.dto";
import { PrismaService } from "../prisma.service";
import { Category, ShopProductItem } from "@prisma/client";
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

    return this.toProductDto(product, categories)
  }

  async createProduct(createProductRequest: CreateProductRequest): Promise<ProductDto> {
    const product = await this.prisma.shopProductItem.create({
      data: {
        creatorUsername: createProductRequest.creatorUsername,
        title: createProductRequest.title,
        price: createProductRequest.price,
        quantity: createProductRequest.amountOnWarehouse,
        description: createProductRequest.description,
        discountPercent: createProductRequest.discountPercent
      }
    });
    let categories: Category[] = [];
    for (const category of createProductRequest.categories) {
      const createdCategory = await this.prisma.category.create({
        data: {
          description: category.toString(),
          shopProductItemId: product.id
        }
      });
      categories.push(createdCategory)
      return this.toProductDto(product, categories)
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

  async getAllAvailableProducts(cursor: number, limit: number): Promise<ProductDto[]> {
    const products: ShopProductItem[] = await this.prisma.shopProductItem.findMany({
      skip: Number(cursor * limit),
      take: Number(limit) + 1
    });
    let result: ProductDto[] = [];
    for (const product of products) {
      const categories = await this.prisma.category.findMany({
        where: {
          shopProductItemId: Number(product.id)
        }
      });

      result.push(this.toProductDto(product, categories));
    }
    return result;
  }

  private toProductDto(product: ShopProductItem, categories: Category[]) {
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
}
