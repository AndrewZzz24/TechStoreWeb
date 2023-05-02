import { Injectable } from "@nestjs/common";
import { ProductDto } from "./dto/product.dto";
import { PrismaService } from "../prisma.service";
import { Category, ShopProductItem } from "@prisma/client";
import { CreateProductRequest } from "./dto/createProductRequest";
import { InvalidCreateProductRequestException, ProductNotFoundException } from "./utils/exceptions";

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) {
  }

  async getProduct(productId: string): Promise<ProductDto> {
    const product = await this.prisma.shopProductItem.findUnique({
      where: {
        id: Number(productId)
      }
    });

    if (product == null) {
      throw new ProductNotFoundException(`no product with such productId= ${productId}`)
    }

    const categories = await this.prisma.category.findMany({
      where: {
        shopProductItemId: Number(productId)
      }
    });

    return this.toProductDto(product, categories)
  }

  async createProduct(createProductRequest: CreateProductRequest): Promise<ProductDto> {
    await this.validateRequest(createProductRequest)

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
    if (await this.prisma.shopProductItem.findUnique({ where: { id: Number(productId) } }) === null){
      throw new ProductNotFoundException(`no product with such productId = ${productId} exists`)
    }

    const categories = await this.prisma.category.deleteMany({
      where: {
        shopProductItemId: Number(productId)
      }
    });

    const deletedProduct = await this.prisma.shopProductItem.delete({
      where: {
        id: Number(productId)
      }
    });
    return deletedProduct != null;
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

  private async validateRequest(createProductRequest: CreateProductRequest) {
    if (createProductRequest.discountPercent < 0){
      throw new InvalidCreateProductRequestException(`discount cannot be less than 0, found=${createProductRequest.discountPercent}`)
    }
    if (await this.prisma.siteUserData.findUnique({ where: { username: createProductRequest.creatorUsername } }) === null) {
      throw new InvalidCreateProductRequestException("product creator's username does not exists");
    }
  }
}
