import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/Modules/Users/Entity/user.entity';
import { In, Repository } from 'typeorm';
import { TodoEntity } from '../Entity/todo.entity';
import { ExtendedRequest } from 'src/Modules/Users/Interfaces/extended-request.interface';
import { CreateTodoDto } from '../DTO/createTodo.dto';
import { RegisterTodo } from '../Interfaces/todo.interface';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,

  ) { }

  async createTodo(req: ExtendedRequest, createTodoDto: CreateTodoDto): Promise<any> {
    let newAssignedUsers;
    if (createTodoDto.assinged_to) {
      const assignedUsers = await this.userRepository.find(
        {
          where: { id: In(createTodoDto.assinged_to) }
        }
      )
      if (assignedUsers.length === 0) throw new HttpException("Users you are trying to assign not found", HttpStatus.NOT_FOUND)
      console.log(assignedUsers)
      newAssignedUsers = assignedUsers.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        status: user.status
      }))
    }
    console.log(newAssignedUsers)
    const createdByUser = await this.userRepository.findOne({ where: { id: req.user.id } })
    const newTodo = new TodoEntity();
    newTodo.name = createTodoDto.name;
    newTodo.description = createTodoDto.description;
    newTodo.createdBy = createdByUser;
    newTodo.status = 'PENDING';
    newTodo.createdAt = new Date();
    newTodo.assinged_to = createdByUser;

    let x = await this.todoRepository.save(newTodo);
    console.log(x)
    return x;
  }


  async assignTodo() {
    return 'TODO ASSIGNED SUCCESSFULLY!';
  }

  async getAllTodos() {
    return 'ALL TOODS';
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
