import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodoService } from './Services/todo.service';
import { CreateTodoDto } from './DTO/createTodo.dto';
import { ExtendedRequest } from '../Users/Interfaces/extended-request.interface';
import { JwtAwtGuard } from 'src/Utilities/jwtAuthGuard';
import { AssignTodoDTO } from './DTO/assignTodo.dto';

@ApiTags('Todo')
@Controller('api/todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAwtGuard)
  async createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @Req() req: ExtendedRequest,
  ) {
    const newTodo = await this.todoService.createTodo(req, createTodoDto);
    return newTodo;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/assignTodo/:todoId/:userId')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAwtGuard)
  async assignTodo(@Param() param: AssignTodoDTO) {
    const assignTodo = await this.todoService.assignTodo(param);
    return assignTodo;
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAwtGuard)
  async getAllTodos(@Query() query) {
    const todos = await this.todoService.getAllTodos(query);
    return todos;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/createdBy')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAwtGuard)
  async getAllTodosCreatedBy(@Query() query, @Req() req: ExtendedRequest) {
    const todos = await this.todoService.getAllTodosCreatedBy(query,req);
    return todos;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/assignedTodos')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAwtGuard)     
  async getAssignedTodos(@Query() query, @Req() req: ExtendedRequest) {
    const todos = await this.todoService.getAssignedTodos(query,req);
    return todos;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAwtGuard)
  async getTodoById(@Param() param) {
    const todo = await this.todoService.getTodoById();
    return todo;
  }

  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAwtGuard)
  async updateTodo(@Param() param) {
    const todo = await this.todoService.updateTodo();
    return todo;
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAwtGuard)
  async deleteTodo(@Param() param) {
    const todo = await this.todoService.deleteTodo();
    return todo;
  }
}
