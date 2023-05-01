import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  readonly surname: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly role: string;

  constructor(
    id: number,
    email: string,
    username: string,
    password: string,
    surname: string,
    name: string,
    role: string,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.surname = surname;
    this.name = name;
    this.role = role;
  }
}
