import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './Services/user.service';
import { RegisterUseDTO } from './DTO/registerUser.dto';
import { JwtAwtGuard } from 'src/Utilities/jwtAuthGuard';
import { Request } from 'express';
import { ExtendedRequest } from './Interfaces/extended-request.interface';
import { UpdateUserDTO } from './DTO/updateUser.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/auth')
  @UsePipes(ValidationPipe)
  async registerUser(@Body() regisetUserDTO: RegisterUseDTO) {
    const registerdUser = await this.userService.register(regisetUserDTO);
    return registerdUser;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/get/all')
  @UseGuards(JwtAwtGuard)
  async getAllUsers(@Query() query) {
    const users = await this.userService.getAllUser(query);
    return users;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/me')
  @UseGuards(JwtAwtGuard)
  async getProfile(@Req() req: ExtendedRequest) {
    const user = await this.userService.getProfile(req);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/get/:id')
  @UseGuards(JwtAwtGuard)
  async getUser(@Param() param) {
    const user = await this.userService.getUser(param);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Put('/update')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAwtGuard)
  async updateUser(
    @Req() req: ExtendedRequest,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const user = await this.userService.updateUser(req, updateUserDTO);
    return user;
  }
  @HttpCode(HttpStatus.OK)
  @Post('/upload/profilePicture')
  @UseInterceptors(FileInterceptor('profilePicture'))
  @UseGuards(JwtAwtGuard)
  async uploadProfilePicture(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
