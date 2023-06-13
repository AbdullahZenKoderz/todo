import { Expose } from 'class-transformer';
import { IsEmail, isEnum, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDTO {

    @IsNotEmpty()
    name: string;
}
