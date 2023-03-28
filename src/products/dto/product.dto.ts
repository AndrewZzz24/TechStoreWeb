export class ProductDto {
  readonly id?: number;
  readonly name: string;
  readonly description: string;
  readonly categories: string[];
  readonly price: number;
  readonly info: Map<string, string>;
}
