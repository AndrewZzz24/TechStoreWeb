import { Module } from '@nestjs/common';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';
import { PrismaService } from "../prisma.service";
import { AppGateway } from "../appGateway/app.gateway";

@Module({
  imports: [],
  controllers: [SupportController],
  providers: [SupportService, PrismaService, AppGateway],
})
export class SupportModule {}
