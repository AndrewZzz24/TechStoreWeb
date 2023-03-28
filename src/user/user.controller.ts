import { Get, Post, Delete, Param, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':user')
  async getUser(@Param('username') username: string): Promise<UserDto> {
    return this.userService.getUser(username);
  }

  @Post(':user/create-user')
  async createUser(@Param('username') username: string): Promise<UserDto> {
    return this.userService.createUser(username);
  }

  @Delete(':user/delete-user')
  async deleteUser(@Param('username') username: string): Promise<boolean> {
    return this.userService.deleteUser(username);
  }
}
