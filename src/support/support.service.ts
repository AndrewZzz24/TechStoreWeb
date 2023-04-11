import { Injectable, NotImplementedException } from '@nestjs/common';
import { SupportRequest } from './dto/supportRequest.dto';
import { RequestSupportRequestDto } from './dto/requestSupportRequest.dto';

@Injectable()
export class SupportService {
  getRequest(requestId: string): Promise<SupportRequest> {
    throw new NotImplementedException();
  }

  createRequest(
    username: string,
    supportRequestDto: RequestSupportRequestDto,
  ): Promise<boolean> {
    throw new NotImplementedException();
  }

  deleteRequest(requestId: string): Promise<boolean> {
    throw new NotImplementedException();
  }
}
