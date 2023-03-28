import { Injectable, NotImplementedException } from '@nestjs/common';
import { SupportRequestDto } from './dto/supportRequest.dto';
import { SupportDto } from './dto/SupportDto';

@Injectable()
export class SupportService {
  getRequest(requestId: string): SupportDto {
    throw NotImplementedException;
  }

  createRequest(
    username: string,
    supportRequestDto: SupportRequestDto,
  ): boolean {
    throw NotImplementedException;
  }

  deleteRequest(requestId: string): boolean {
    throw NotImplementedException;
  }
}
