import { Module } from '@nestjs/common';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';

@Module({
  imports: [],
  controllers: [SupportController],
  providers: [
    {
      provide: SupportService,
      useClass: SupportService,
    },
  ],
})
export class SupportModule {}
