import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { createTaskDTO } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskModel } from './task.model';
import { TaskStatus } from './taskStatus.enum';
import { DeepPartial } from 'typeorm';
import { AuthEntity } from 'src/auth/auth.entity';

@Injectable()
export class TasksService {
  
  constructor(
    @InjectRepository(TaskRepository)
    private  taskRepository: TaskRepository,
  ) {}

 async getAllTasks() : Promise<TaskEntity[]>{
       const tasks= await this.taskRepository.
       createQueryBuilder('task')
       .select(['task.id', 'task.title', 'task.description', 'task.status', 'creator.id'])
       .leftJoin("task.creator" , "creator") 
       .getMany();
     
      // find({ select : ["id" , "title" , "description" ,"status" , "creator"] , relations : ["creator"]});
       return tasks;
  }

  async createTask(createTaskDto: createTaskDTO): Promise<TaskEntity> {
    const { title, description , creator} = createTaskDto;
    const task: TaskModel = {
      title: title,
      description: description,
      status: TaskStatus.OPEN,
      creator : creator
    };

    const newTask = this.taskRepository.create(task);
    await newTask.save({reload:true});
    console.log(newTask);
    return newTask;
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    let task: TaskEntity;

    task = await this.taskRepository.
    createQueryBuilder('task')
    .select(['task.id', 'task.title', 'task.description', 'task.status', 'creator.id'])
    .leftJoin("task.creator" , "creator") 
    .getOne();

    // catch(err) {
    //     throw new InternalServerErrorException(err);
    // }

    if (!task) {
      throw new NotFoundException('No Task exists with this ID');
    }
    
    return task;
  }

  async deleteTask(id: string , creator : DeepPartial<AuthEntity>):Promise<string> {
      const remaining = await this.taskRepository.
      createQueryBuilder('task')
      .select(['task.id', 'task.title', 'task.description', 'task.status', 'creator.id'])
      .leftJoin("task.creator" , "creator") 
      .getOne();
       console.log(remaining.creator.id + " " + creator);
       if(remaining.creator.id!==creator)
       {
        throw new UnauthorizedException("Not Authorzied access");
       }
       await remaining.remove();

       return "task deleted successfully!";
  }

  async updateTaskStatus(id:string , status:TaskStatus , creator: DeepPartial<AuthEntity>) : Promise<TaskEntity> {
      const task = await this.taskRepository.
      createQueryBuilder('task')
      .select(['task.id', 'task.title', 'task.description', 'task.status', 'creator.id'])
      .leftJoin("task.creator" , "creator") 
      .getOne();
      if(task.creator.id!==creator)
      {
       throw new UnauthorizedException("Not Authorzied access");
      }

      task.status = status;
      await task.save();
      return task;
  }
}
