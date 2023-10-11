import { IsNotEmpty } from "class-validator"

export class SignupDTO{
    @IsNotEmpty()
    username : string;
    @IsNotEmpty()
    email : string;
    @IsNotEmpty()
    password : string;
};

export class LoginDTO{

    @IsNotEmpty()
    email : string;
    @IsNotEmpty()
    password : string;
};