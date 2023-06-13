import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './Services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login() {
    const token = await this.authService.login();
    return token;
  }
}
