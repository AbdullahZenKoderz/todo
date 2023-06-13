import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  async createTodo() {
    return 'TODO CREATED SUCCESSFULLY!';
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
