import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './Services/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {};
