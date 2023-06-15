import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/Modules/Users/Entity/user.entity';
import { In, Repository } from 'typeorm';
import { TodoEntity } from '../Entity/todo.entity';
import { ExtendedRequest } from 'src/Modules/Users/Interfaces/extended-request.interface';
import { CreateTodoDto } from '../DTO/createTodo.dto';
import { RegisterTodo } from '../Interfaces/todo.interface';
import { AssignTodoDTO } from '../DTO/assignTodo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async createTodo(
    req: ExtendedRequest,
    createTodoDto: CreateTodoDto,
  ): Promise<any> {
    let assignedUsers;
    if (createTodoDto.assingedTo) {
      assignedUsers = await this.userRepository.findOne({
        where: { id: createTodoDto.assingedTo },
      });
      if (assignedUsers.length === 0)
        throw new HttpException(
          'Users you are trying to assign not found',
          HttpStatus.NOT_FOUND,
        );
    }
    const createdByUser = await this.userRepository.findOne({
      where: { id: req.user.id },
    });
    const newTodo = new TodoEntity();
    newTodo.name = createTodoDto.name;
    newTodo.description = createTodoDto.description;
    newTodo.createdBy = createdByUser;
    newTodo.status = 'PENDING';
    newTodo.createdAt = new Date();
    newTodo.assingedTo = assignedUsers;

    let x = await this.todoRepository.save(newTodo);
    return x;
  }

  async assignTodo(param: AssignTodoDTO) {
    const { userId, todoId } = param;
    const todo = await this.todoRepository.findOne({
      where: { id: +todoId },
      relations: { assingedTo: true, createdBy: true },
    });
    const assignUser = await this.userRepository.findOne({
      where: { id: +userId },
    });
    if (!todo || !assignUser)
      throw new HttpException('No todo or user found', HttpStatus.NOT_FOUND);
    if (!todo.assingedTo) {
      todo.assingedTo = assignUser;
      await this.todoRepository.save(todo);
      return {
        message: 'Todo assigned successfully!',
        todo: todo,
      };
    } else {
      throw new HttpException(
        `Todo already assigned to ${assignUser.email}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllTodos(query) {
    const page: number = +query.page || 1;
    const limit: number = +query.limit || 10;
    const result = await this.todoRepository.find({
      relations: { assingedTo: true, createdBy: true },
      skip: (page - 1) * limit,
      take: limit,
    });
    return result;
  }

  async getAssignedTodos(query, req: ExtendedRequest) {
    const page: number = +query.page || 1;
    const limit: number = +query.limit || 10;
    const result = await this.todoRepository.find({
      relations: {
        assingedTo: true,
        createdBy: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      where: {
        assingedTo: {
          id: req.user.id,
        },
      },
    });
    return result;
  }

  async getAllTodosCreatedBy(query, req: ExtendedRequest) {
    const page: number = +query.page || 1;
    const limit: number = +query.limit || 10;
    const result = await this.todoRepository.find({
      relations: {
        assingedTo: true,
        createdBy: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      where: {
        createdBy: {
          id: req.user.id,
        },
      },
    });
    return result;
  }
  async getTodoById() {
    return 'TODO BY ID';
  }
  async updateTodo() {
    return 'TODO UPDATED SUCCESSFULLY!';
  }
  async deleteTodo() {
    return 'TODO DELETED SUCCESSFULLY!';
  }
}
