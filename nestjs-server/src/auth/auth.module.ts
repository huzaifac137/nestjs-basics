import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports : [TypeOrmModule.forFeature([AuthEntity]) ,
    JwtModule.register({
      global : true ,
      secret : "heythisissceret" ,
      signOptions : {expiresIn:"1d"}
    })],
  controllers: [AuthController],
  providers: [AuthService , AuthRepository]
})
export class AuthModule {}
