import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthPayloadDTO {

    @IsNotEmpty()
    @IsEmail()
    email : string;

    id : number;

    

}