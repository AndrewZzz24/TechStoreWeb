export class OrderDto {
  readonly id?: number;
  readonly customerUsername: string;
  readonly createAt: string;
  readonly products: string[];
  readonly price: number;
  readonly info: Map<string, string>;
}
