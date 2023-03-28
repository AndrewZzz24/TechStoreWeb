export class UserDto {
  readonly id?: number;
  readonly username: string;
  readonly password: string;
  readonly info: Map<string, string>;
}
