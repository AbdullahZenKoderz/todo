import { Expose } from 'class-transformer';
import { IsEmail, isEnum, isNotEmpty, IsNotEmpty, MinLength } from 'class-validator';

export class CreateTodoDto {

    @IsNotEmpty()
    assinged_to: number[];
}