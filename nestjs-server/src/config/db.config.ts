import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const dbConfigOptions : TypeOrmModuleOptions = {
type :"postgres" ,
database :"taskmanagement" ,
username :"postgres" ,
password :"qwerty7867" ,
host:"localhost" ,
synchronize : true ,
entities :  [__dirname + '/../**/*.entity.{js,ts}']
}