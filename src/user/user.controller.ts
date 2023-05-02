import {
  Get,
  Post,
  Delete,
  Param,
  Controller,
  Body,
  ConsoleLogger,
  UseFilters,
  Query,
  UseGuards, HttpException, HttpCode, HttpStatus
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import { CreateUserRequest } from "./dto/CreateUserRequest";
import { UserRole } from "@prisma/client";
import { AuthRequest } from "./dto/authRequest";
import { SupportRequest } from "../support/dto/supportRequest.dto";
import { OrderDto } from "../order/dto/order.dto";
import { CartDto } from "../cart/dto/cart.dto";
import { SessionContainer } from "supertokens-node/recipe/session";
import { ChangeAccountDataRequest } from "./dto/changeAccountDataRequest";
import { AuthGuard } from "../auth/auth.guard";
import { Session } from "../auth/session.decorator";
import EmailPassword from "supertokens-node/recipe/emailpassword";

// @ApiBearerAuth()
@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @ApiOperation({ summary: "Get user" })
  @ApiParam({ name: "username", type: "string" })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully found.",
    type: UserDto
  })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Not Found" })
  @Get("/:username")
  async getUser(@Param("username") username: string): Promise<UserDto> {

    return this.userService.getUser(username);
  }

  @ApiOperation({ summary: "Create user customer" })
  @ApiResponse({
    status: 201,
    description: "The user customer has been successfully created.",
    type: UserDto
  })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @Post("/create-customer")
  async createCustomer(
    @Body() createUserRequest: CreateUserRequest
  ): Promise<UserDto> {
    return this.userService.createUser(createUserRequest, UserRole.CUSTOMER);
  }

  @ApiOperation({ summary: "Create user admin" })
  @ApiResponse({
    status: 201,
    description: "The user admin has been successfully created.",
    type: UserDto
  })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @Post("/create-admin")
  async createAdmin(
    @Body() createUserRequest: CreateUserRequest
  ): Promise<UserDto> {
    return this.userService.createUser(createUserRequest, UserRole.ADMIN);
  }

  @ApiOperation({ summary: "Delete user" })
  @ApiParam({ name: "username", type: "string" })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully deleted",
    type: Boolean
  })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Not Found" })
  @UseGuards(new AuthGuard())
  @Delete()
  async deleteUser(
    @Session() session: SessionContainer,
  ): Promise<boolean> {
    const userId = session.getUserId(session);
    const user = await EmailPassword.getUserById(userId);
    return this.userService.deleteUser(user.email);
  }

  @ApiOperation({ summary: "Auth user" })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully authorised",
    type: UserDto
  })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Not Found" })
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @Post("/auth")
  async auth(
    @Session() session: SessionContainer,
    @Body() authRequest: AuthRequest
  ): Promise<UserDto> {
    return this.userService.auth(authRequest);
  }

  @ApiOperation({ summary: "Get user`s cart" })
  @ApiParam({ name: "uid", type: "string" })
  @ApiResponse({
    status: 200,
    description: "The user`s cart has been successfully found.",
    type: CartDto
  })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Not Found" })
  @Get("/:uid/cart")
  async getUserCart(@Param("uid") username: string): Promise<CartDto> {
    return this.userService.getUserCart(username);
  }

  @ApiOperation({ summary: "Get user`s orders" })
  @ApiParam({ name: "uid", type: "string" })
  @ApiResponse({
    status: 200,
    description: "The user`s orders has been successfully found.",
    type: [OrderDto]
  })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Not Found" })
  @Get("/:uid/orders")
  async getUserOrders(@Param("uid") username: string): Promise<OrderDto[]> {
    return this.userService.getUserOrders(username);
  }

  @ApiOperation({ summary: "Get user`s support requests" })
  @ApiResponse({
    status: 200,
    description: "The user`s support requests has been successfully found.",
    type: [SupportRequest]
  })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Not Found" })
  @UseGuards(new AuthGuard())
  @Get("/account/support-requests")
  async getUserSupportRequests(
    @Session() session: SessionContainer,
    @Query("cursor") cursor: string,
    @Query("limit") limit: string
  ): Promise<SupportRequest[]> {
    const userId = session.getUserId(session);
    const user = await EmailPassword.getUserById(userId);
    return this.userService.getUserSupportRequests(user.email, Number(cursor), Number(limit));
  }

  @ApiOperation({ summary: "Get user`s support requests" })
  @ApiResponse({
    status: 200,
    description: "The user`s support requests has been successfully found.",
    type: UserDto
  })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Not Found" })
  @Post("/account/change-account-data")
  async changeUserAccountData(
    @Session() session: SessionContainer,
    @Body() changeAccountDataRequest: ChangeAccountDataRequest
  ): Promise<UserDto> {
    const userId = session.getUserId(session);
    const user = await EmailPassword.getUserById(userId);
    return this.userService.changeUserAccountData(user.email, changeAccountDataRequest);
  }
}
