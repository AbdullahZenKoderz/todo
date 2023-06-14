import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './Services/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Users/Entity/user.entity';
import { TodoEntity } from './Entity/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TodoEntity]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [],
})
export class TodoModule { };

