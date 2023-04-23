import { Injectable, NotImplementedException } from '@nestjs/common';
import { SupportRequest } from './dto/supportRequest.dto';
import { CreateSupportRequest } from './dto/createSupportRequest';

@Injectable()
export class SupportService {
  getRequest(requestId: string): Promise<SupportRequest> {
    throw new NotImplementedException();
  }

  createRequest(
    supportRequestDto: CreateSupportRequest,
  ): Promise<SupportRequest> {
    throw new NotImplementedException();
  }

  deleteRequest(requestId: string): Promise<boolean> {
    throw new NotImplementedException();
  }
}
