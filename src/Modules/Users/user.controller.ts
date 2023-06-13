import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './Services/user.service';

@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/auth')
  @UsePipes(ValidationPipe)
  async registerUser() {
    const registerdUser = await this.userService.register();
    return registerdUser;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/get/all/users')
  @UsePipes(ValidationPipe)
  async getAllUsers() {
    const users = await this.userService.getAllUser();
    return users;
  }
}
