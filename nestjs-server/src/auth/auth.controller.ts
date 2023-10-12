import { Body, Controller, Post, Req, Res, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import {Request , Response} from "express";
import { LoginDTO, SignupDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @Post("login")
    @UsePipes(ValidationPipe)
    async LoginUser(@Body() creds:LoginDTO , @Req() req:Request , @Res() res:Response ) : Promise<void>{
           const data = await this.authService.Login(creds);
           res.status(201).json({data});
    }

    @Post("signup")
    @UsePipes(ValidationPipe)
    async SignupUser(@Body() creds:SignupDTO , @Req() req:Request , @Res() res:Response ) : Promise<void>{
         const response = await this.authService.Signup(creds);
         res.status(201).json({message : response});
    }
}
