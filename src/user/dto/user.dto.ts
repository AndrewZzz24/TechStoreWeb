import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly surname: string;
  @ApiProperty()
  readonly patronymic?: string;
  @ApiProperty()
  readonly info: string;
  @ApiProperty()
  readonly dateOfBirth: string;
  @ApiProperty()
  readonly role: string;

  constructor(id: number, username: string, password: string, info: string) {
    this.id = id
    this.username = username
    this.password = password
    this.info = info
  }
}