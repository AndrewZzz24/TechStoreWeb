import { Get, Post, Delete, Param, Controller, Body } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SupportService } from './support.service';
import { SupportRequest } from './dto/supportRequest.dto';
import { RequestSupportRequestDto } from './dto/requestSupportRequest.dto';

@ApiBearerAuth()
@ApiTags('support')
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @ApiOperation({ summary: 'Get support request' })
  @ApiParam({ name: 'requestId', type: 'string' })
  @ApiResponse({
    status: 201,
    description: 'The support request has been successfully found.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('get_request/:requestId')
  async getSupportRequest(
    @Param('requestId') requestId: string,
  ): Promise<SupportRequest> {
    return this.supportService.getRequest(requestId);
  }

  @ApiOperation({ summary: 'Create support request' })
  @ApiParam({ name: 'uid', type: 'string' })
  @ApiResponse({
    status: 201,
    description: 'The support request has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User Not Found' })
  @Post('create_request/:uid')
  async createSupportRequest(
    @Param('uid') username: string,
    @Body() supportRequestDto: RequestSupportRequestDto,
  ): Promise<boolean> {
    return this.supportService.createRequest(username, supportRequestDto);
  }

  @ApiOperation({ summary: 'Delete support request' })
  @ApiParam({ name: 'requestId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The support request has been successfully delete.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete('delete_request/:requestId')
  async deleteSupportRequest(
    @Param('requestId') requestId: string,
  ): Promise<boolean> {
    return this.supportService.deleteRequest(requestId);
  }
}
