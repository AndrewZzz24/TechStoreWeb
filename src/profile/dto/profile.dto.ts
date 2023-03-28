export class ProfileDto {
  readonly id?: number;
  readonly username: string;
  readonly reviews: string[];
  readonly info: Map<string, string>;
}
