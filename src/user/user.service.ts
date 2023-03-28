import { Injectable, NotImplementedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  getUser(username: string): UserDto {
    throw NotImplementedException;
  }

  createUser(username: string): UserDto {
    throw NotImplementedException;
  }

  deleteUser(username: string): boolean {
    throw NotImplementedException;
  }
}
