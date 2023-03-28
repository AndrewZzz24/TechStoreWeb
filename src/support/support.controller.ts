import { Get, Post, Delete, Param, Controller, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SupportService } from './support.service';
import { SupportRequestDto } from './dto/supportRequest.dto';

@ApiBearerAuth()
@ApiTags('support')
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get(':support/get-request')
  async getSupportRequest(
    @Param('requestId') requestId: string,
  ): Promise<SupportRequestDto> {
    return this.supportService.getRequest(requestId);
  }

  @Post(':support/create-request')
  async createSupportRequest(
    @Param('username') username: string,
    @Body() supportRequestDto: SupportRequestDto,
  ): Promise<boolean> {
    return this.supportService.createRequest(username, supportRequestDto);
  }

  @Delete(':support/delete-request')
  async deleteSupportRequest(
    @Param('requestId') requestId: string,
  ): Promise<boolean> {
    return this.supportService.deleteRequest(requestId);
  }
}
