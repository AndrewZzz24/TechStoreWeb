import { Get, Post, Delete, Param, Controller, Body, ConsoleLogger, UseFilters, Query } from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import {UserDto} from "./dto/user.dto";
import {UserService} from "./user.service";
import {CreateUserRequest} from "./dto/CreateUserRequest";
import {UserRole} from "@prisma/client";
import {AuthRequest} from "./dto/authRequest";
import {SupportRequest} from "../support/dto/supportRequest.dto";
import {OrderDto} from "../order/dto/order.dto";
import {CartDto} from "../cart/dto/cart.dto";
import { HttpExceptionFilter } from "../exception.filter";
import { ChangeAccountDataRequest } from "./dto/changeAccountDataRequest";

@ApiBearerAuth()
@ApiTags("users")
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @ApiOperation({summary: "Get user"})
    @ApiParam({name: "username", type: "string"})
    @ApiResponse({
        status: 200,
        description: "The user has been successfully found.",
        type: UserDto
    })
    @ApiResponse({status: 403, description: "Forbidden"})
    @ApiResponse({status: 404, description: "Not Found"})
    @Get("/:username")
    async getUser(@Param("username") username: string): Promise<UserDto> {
        return this.userService.getUser(username);
    }

    @ApiOperation({summary: "Create user customer"})
    @ApiResponse({
        status: 201,
        description: "The user customer has been successfully created.",
        type: UserDto
    })
    @ApiResponse({status: 403, description: "Forbidden"})
    @Post("/create-customer")
    async createCustomer(
        @Body() createUserRequest: CreateUserRequest
    ): Promise<UserDto> {
        return this.userService.createUser(createUserRequest, UserRole.CUSTOMER);
    }

    @ApiOperation({summary: "Create user admin"})
    @ApiResponse({
        status: 201,
        description: "The user admin has been successfully created.",
        type: UserDto
    })
    @ApiResponse({status: 403, description: "Forbidden"})
    @Post("/create-admin")
    async createAdmin(
        @Body() createUserRequest: CreateUserRequest
    ): Promise<UserDto> {
        return this.userService.createUser(createUserRequest, UserRole.ADMIN);
    }

    @ApiOperation({summary: "Delete user"})
    @ApiParam({name: "username", type: "string"})
    @ApiResponse({
        status: 200,
        description: "The user has been successfully deleted",
        type: Boolean
    })
    @ApiResponse({status: 403, description: "Forbidden"})
    @ApiResponse({status: 404, description: "Not Found"})
    @Delete("/:username")
    async deleteUser(@Param("username") username: string): Promise<boolean> {
        return this.userService.deleteUser(username);
    }

    @ApiOperation({summary: "Auth user"})
    @ApiResponse({
        status: 200,
        description: "The user has been successfully authorised",
        type: UserDto
    })
    @ApiResponse({status: 403, description: "Forbidden"})
    @ApiResponse({status: 404, description: "Not Found"})
    @Post("/auth")
    async auth(@Body() authRequest: AuthRequest): Promise<UserDto> {
        return this.userService.auth(authRequest);
    }

    @ApiOperation({ summary: 'Get user`s cart' })
    @ApiParam({ name: 'uid', type: 'string' })
    @ApiResponse({
      status: 200,
      description: 'The user`s cart has been successfully found.',
      type: CartDto,
    })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @Get('/:uid/cart')
    async getUserCart(@Param('uid') username: string): Promise<CartDto> {
      return this.userService.getUserCart(username);
    }

    @ApiOperation({ summary: 'Get user`s orders' })
    @ApiParam({ name: 'uid', type: 'string' })
    @ApiResponse({
      status: 200,
      description: 'The user`s orders has been successfully found.',
      type: Array<OrderDto>,
    })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @Get('/:uid/orders')
    async getUserOrders(@Param('uid') username: string): Promise<OrderDto[]> {
      return this.userService.getUserOrders(username);
    }
    //
    @ApiOperation({ summary: 'Get user`s support requests' })
    @ApiParam({ name: 'uid', type: 'string' })
    @ApiResponse({
      status: 200,
      description: 'The user`s support requests has been successfully found.',
      type: [SupportRequest],
    })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @Get('/:uid/support-requests')
    async getUserSupportRequests(
      @Param('uid') userId: string,
      @Query('cursor') cursor: string,
      @Query('limit') limit: string,
    ): Promise<SupportRequest[]> {
      return this.userService.getUserSupportRequests(userId, Number(cursor), Number(limit));
    }

    @ApiOperation({ summary: 'Get user`s support requests' })
    @ApiParam({ name: 'uid', type: 'string' })
    @ApiResponse({
        status: 200,
        description: 'The user`s support requests has been successfully found.',
        type: Boolean,
    })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @Post('/:uid/change-account-data')
    async changeUserAccountData(
      @Param('uid') username: string,
      @Body() changeAccountDataRequest: ChangeAccountDataRequest
    ): Promise<Boolean> {
        return this.userService.changeUserAccountData(username, changeAccountDataRequest);
    }
}
