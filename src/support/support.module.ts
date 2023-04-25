import { Module } from '@nestjs/common';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';
import { PrismaService } from "../prisma.service";

@Module({
  imports: [],
  controllers: [SupportController],
  providers: [SupportService, PrismaService],
})
export class SupportModule {}
