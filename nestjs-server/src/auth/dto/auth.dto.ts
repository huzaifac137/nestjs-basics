import { IsEmail, IsNotEmpty } from "class-validator"

export class SignupDTO{
    @IsNotEmpty()
    username : string;
    @IsEmail()
    email : string;
    @IsNotEmpty()
    password : string;
};

export class LoginDTO{

    @IsEmail()
    email : string;
    @IsNotEmpty()
    password : string;
};