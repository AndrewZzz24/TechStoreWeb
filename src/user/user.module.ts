import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from "../prisma.service";

@Module({
  imports: [

  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserService,
      useClass: UserService,
    },
    {
      provide: PrismaService,
      useClass: PrismaService,
    },
  ],
})
export class UserModule {}
