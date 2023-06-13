import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './Services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entity/user.entity';
import { TodoEntity } from '../Todos/Entity/todo.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../Auth/Services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TodoEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService,AuthService],
  exports: [UserService],
})
export class UserModule {}
