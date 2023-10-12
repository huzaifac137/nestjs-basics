import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { LoginDTO, SignupDTO } from './dto/auth.dto';
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(AuthRepository) private authRepo : AuthRepository ,
     private jwtService: JwtService ) {}

    async Login(creds :LoginDTO) {
        const { email, password } = creds;
    
      
        let emailExists;
        try {
          emailExists = await this.authRepo.findOne({ where : {email:email}});
        } catch (err) {
            throw new InternalServerErrorException("Something went wrong")
        }
      
        if (!emailExists) {
             throw new BadRequestException("No such user exists");
        }
      
        let comparePassword;
        try {
          comparePassword = await bcrypt.compare(password, emailExists.password);
        } catch (err) {
            throw new InternalServerErrorException("Something went wrong")
        }
      
        if (comparePassword !== true) {
            throw new UnauthorizedException("Password is wrong");
        }
        let token : string ;
      
        try {
          token = await this.jwtService.signAsync({
            userId: emailExists.id,
            email: emailExists.email,
            username: emailExists.username,
          });

        } catch (err) {
            throw new InternalServerErrorException(err.message)
        }

        const resp = {
            email : emailExists.email ,
            userId : emailExists.id ,
            username : emailExists.username ,
            token : token
        };

        return resp;
      
    }

    async Signup(creds :SignupDTO) : Promise<string> {
        const { username, email, password } = creds;
      
        let alreadyExists;
        try {
          alreadyExists = await this.authRepo.findOne({where : {email : email}});
        } catch (err) {
          throw new InternalServerErrorException("Something went wrong")
        }
      
        if (alreadyExists) {
           throw new ConflictException("User with this email already exists");
        }
      
      
        const hashedPassword = await bcrypt.hash(password, 5);
      
        try {
          const newUser = this.authRepo.create({
            email: email,
            username: username,
            password: hashedPassword,
          });
          await newUser.save();
        } catch (err) {
            throw new InternalServerErrorException("Something went wrong")
        }
      
        const stringRes = "Successfully created your account , Login to continue!";
        return stringRes;
    }
}
