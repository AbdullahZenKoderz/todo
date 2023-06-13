import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UserService } from 'src/Modules/Users/Services/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/Utilities/bcrypt';
import { AuthPayloadDTO } from '../DTO/authPayload.dto';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {

    return 'LOGIN SUCCESSFULLY!';
  }

  async generateAuthToken(AuthPayloadDTO: AuthPayloadDTO) {
    return this.jwtService.sign(AuthPayloadDTO);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      const matchPassword = comparePassword(password, user.password);
      if (!matchPassword)
        throw new HttpException('Wrong password.', HttpStatus.UNAUTHORIZED);
      return user;
    } else {
      throw new HttpException(
        "User with this email address doesn't exist.",
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
