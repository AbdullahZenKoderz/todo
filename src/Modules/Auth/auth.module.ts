import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './Services/auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {};
