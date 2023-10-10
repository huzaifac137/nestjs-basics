import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfigOptions } from './config/db.config';


@Module({
  imports: [ 
    TypeOrmModule.forRoot(dbConfigOptions)
    ,
    TasksModule],
})
export class AppModule  {}
