import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfigOptions } from './config/db.config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ 
    TypeOrmModule.forRoot(dbConfigOptions)
    ,
    TasksModule,
    AuthModule],
})
export class AppModule  {}
