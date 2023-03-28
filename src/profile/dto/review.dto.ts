export class ReviewDto {
  readonly id?: number;
  readonly title: string;
  readonly mark: string;
  readonly description: string;
  readonly metaInfo: Map<string, string>;
}
