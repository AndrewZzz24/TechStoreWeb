import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly createdAt: string;
  @ApiProperty()
  readonly creatorUsername: string;
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly price: number;
  @ApiProperty()
  readonly quantity: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly categories: string[];
  @ApiProperty()
  readonly discountPercent?: number;

  constructor(
    id: number,
    createdAt: string,
    creatorUsername: string,
    title: string,
    price: number,
    quantity: string,
    description: string,
    categories: string[],
    discountPercent?: number
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.creatorUsername = creatorUsername;
    this.title = title;
    this.description = description;
    this.price = price;
    this.categories = categories;
    this.discountPercent = discountPercent;
  }

  // public fromShopProductItem(shopProductItem: ShopProductItem): ProductDto {
  //   return new ProductDto(
  //     id = shopProductItem.id,
  //
  //   )
  // }
}
