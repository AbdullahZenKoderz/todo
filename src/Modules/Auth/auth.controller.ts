import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './Services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthDTO } from './DTO/auth.dto';
import { Request } from 'express';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  @UsePipes(ValidationPipe)   
  async login(@Body() authDto: AuthDTO, @Req() req: Request) {
    const token = await this.authService.login(authDto);
    return token;
  }
}
