import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { LoginDTO, SignupDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(AuthRepository) private authRepo : AuthRepository) {}

    async Login(creds :LoginDTO) : Promise<LoginDTO>{
          return creds;
    }

    async Signup(creds :SignupDTO) : Promise<SignupDTO> {
        return creds;
    }
}
