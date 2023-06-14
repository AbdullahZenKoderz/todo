import { Expose } from 'class-transformer';
import { IsEmail, isEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  assinged_to?: number[];
}