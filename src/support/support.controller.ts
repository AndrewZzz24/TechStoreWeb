import { Get, Post, Delete, Param, Controller, Body, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { SupportService } from './support.service';
import { SupportRequest } from './dto/supportRequest.dto';
import { CreateSupportRequest } from './dto/createSupportRequest';
import { AuthGuard } from "../auth/auth.guard";
import { Session } from "../auth/session.decorator";
import { SessionContainer } from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";

@ApiTags('support')
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @ApiOperation({ summary: 'Get support request' })
  @ApiParam({ name: 'requestId', type: 'string' })
  @ApiResponse({
    status: 201,
    description: 'The support request has been successfully found.',
    type: SupportRequest,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('/:requestId')
  async getSupportRequest(
    @Param('requestId') requestId: string,
  ): Promise<SupportRequest> {
    return this.supportService.getRequest(requestId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create support request' })
  @ApiResponse({
    status: 201,
    description: 'The support request has been successfully created.',
    type: SupportRequest,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User Not Found' })
  @UseGuards(new AuthGuard())
  @Post('/create-support-request')
  async createSupportRequest(
    @Session() session: SessionContainer,
    @Body() supportRequestDto: CreateSupportRequest,
  ): Promise<SupportRequest> {
    console.log("ВЫВОД", "12312321321312")
    const userId = session.getUserId(session)
    const user = await EmailPassword.getUserById(userId)
    console.log(userId)
    console.log(user)
    return this.supportService.createRequest(user.email, supportRequestDto);
  }

  @ApiOperation({ summary: 'Delete support request' })
  @ApiParam({ name: 'requestId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The support request has been successfully delete.',
    type: Boolean,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete('/:requestId')
  async deleteSupportRequest(
    @Param('requestId') requestId: string,
  ): Promise<boolean> {
    return this.supportService.deleteRequest(requestId);
  }
}
