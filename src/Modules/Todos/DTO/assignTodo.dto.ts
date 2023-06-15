import { Expose } from 'class-transformer';
import { IsEmail, isEnum, isNotEmpty, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class AssignTodoDTO {

    @IsNotEmpty()
    todoId:number

    @IsNotEmpty()
    userId:number
}