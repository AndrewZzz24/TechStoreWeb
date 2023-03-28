import { Injectable, NotImplementedException } from '@nestjs/common';
import { ReviewDto } from './dto/review.dto';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  getUserProfile(username: string): ProfileDto {
    throw NotImplementedException;
  }

  getUserProfileReviews(username: string): Array<ReviewDto> {
    throw NotImplementedException;
  }
}
