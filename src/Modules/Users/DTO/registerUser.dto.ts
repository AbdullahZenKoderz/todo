import { Expose } from 'class-transformer';
import { IsEmail, isEnum, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUseDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  name: string;
}
