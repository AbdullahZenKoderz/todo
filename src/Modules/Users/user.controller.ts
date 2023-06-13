import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './Services/user.service';
import { RegisterUseDTO } from './DTO/registerUser.dto';
import { JwtAwtGuard } from 'src/Utilities/jwtAuthGuard';

@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/auth')
  @UsePipes(ValidationPipe)
  async registerUser(@Body() regisetUserDTO: RegisterUseDTO) {
    console.log(regisetUserDTO);
    const registerdUser = await this.userService.register(regisetUserDTO);
    return registerdUser;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/get/all')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAwtGuard)
  async getAllUsers() {
    const users = await this.userService.getAllUser();
    return users;
  }
}
