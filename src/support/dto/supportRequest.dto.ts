export class SupportRequestDto {
  readonly id?: number;
  readonly usernameInitiator: string;
  readonly title: string;
  readonly info: Map<string, string>;
}
