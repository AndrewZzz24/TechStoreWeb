import { Injectable, NotImplementedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  getUser(uid: string): UserDto {
    throw new NotImplementedException();
  }

  createUser(uid: string): UserDto {
    throw new NotImplementedException();
  }

  deleteUser(uid: string): boolean {
    throw new NotImplementedException();
  }
}
