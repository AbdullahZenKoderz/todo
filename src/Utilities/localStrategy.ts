import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { comparePassword } from './bcrypt';
import { AuthService } from 'src/Modules/Auth/Services/auth.service';



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: "email" });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password );
        if (!user) {
            throw new UnauthorizedException();
        }

        const passwordMatched = comparePassword(password, user.password)
        if (!passwordMatched) {
            throw new UnauthorizedException();
        }       

        return user;
    }
}