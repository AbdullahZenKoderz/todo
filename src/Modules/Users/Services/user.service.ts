import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async register() {
    return 'USER CREATED SUCCESSFULL';
  }

  async getAllUser() {
    return 'ALL USERS';
  }
}
