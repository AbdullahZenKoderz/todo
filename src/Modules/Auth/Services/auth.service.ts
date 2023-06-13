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
import { AuthDTO } from '../DTO/auth.dto';
import { USER_STATUS } from 'src/Utilities/types';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async login(userCredentials: AuthDTO) {
    const user = await this.validateUser(userCredentials.email, userCredentials.password);
    if (user.status === USER_STATUS.INACTIVE) {
      throw new HttpException('User inactive', HttpStatus.BAD_REQUEST);
    }
    const payload = {
      id:user.id,
      email:user.email
    }
    const token = await this.generateAuthToken(payload);
    return {
      message: "Login successfully!",
      user: user.email,
      token
    };
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
