import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodoService } from './Services/todo.service';

@ApiTags('Todo')
@Controller('api/todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UsePipes(ValidationPipe)
  async createTodo() {
    const newTodo = await this.todoService.createTodo();
    return newTodo;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/assignTodo/:id')
  @UsePipes(ValidationPipe)
  async assignTodo(@Param() param) {
    const assignTodo = await this.todoService.assignTodo();
    return assignTodo;
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @UsePipes(ValidationPipe)
  async getAllTodos() {
    const todos = await this.todoService.getAllTodos();
    return todos;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @UsePipes(ValidationPipe)
  async getTodoById(@Param() param) {
    const todo = await this.todoService.getTodoById();
    return todo;
  }

  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateTodo(@Param() param) {
    const todo = await this.todoService.updateTodo();
    return todo;
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  @UsePipes(ValidationPipe)
  async deleteTodo(@Param() param) {
    const todo = await this.todoService.deleteTodo();
    return todo;
  }
}
