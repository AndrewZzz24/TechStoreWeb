import { Get, Post, Param, Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReviewDto } from './dto/review.dto';
import { ProfileDto } from './dto/profile.dto';

@ApiBearerAuth()
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':profile')
  async getProfile(@Param('username') username: string): Promise<ProfileDto> {
    return this.profileService.getUserProfile(username);
  }

  @Post(':profile/get-reviews')
  async getUserReviews(
    @Param('username') username: string,
  ): Promise<Array<ReviewDto>> {
    return this.profileService.getUserProfileReviews(username);
  }
}
