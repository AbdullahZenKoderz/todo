import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './Services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Users/Entity/user.entity';
import { TodoEntity } from '../Todos/Entity/todo.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../Users/Services/user.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TodoEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,UserService],
  exports: [AuthService],
})
export class AuthModule {}
