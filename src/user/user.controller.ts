import { Get, Post, Delete, Param, Controller } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user' })
  @ApiParam({ name: 'uid', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully found.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('/:uid')
  async getUser(@Param('uid') username: string): Promise<UserDto> {
    return this.userService.getUser(username);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiParam({ name: 'uid', type: 'string' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('create_user/:uid')
  async createUser(@Param('uid') username: string): Promise<UserDto> {
    return this.userService.createUser(username);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'uid', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete('delete_user/:uid')
  async deleteUser(@Param('uid') username: string): Promise<boolean> {
    return this.userService.deleteUser(username);
  }
}
