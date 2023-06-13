import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './Services/todo.service';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [],
})
export class TodoModule {};

