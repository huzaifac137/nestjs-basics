import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { createTaskDTO } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskModel } from './task.model';
import { TaskStatus } from './taskStatus.enum';

@Injectable()
export class TasksService {
  
  constructor(
    @InjectRepository(TaskRepository)
    private  taskRepository: TaskRepository,
  ) {}

 async getAllTasks() : Promise<TaskEntity[]>{
       const tasks= await this.taskRepository.find({});
       return tasks;
  }

  async createTask(createTaskDto: createTaskDTO): Promise<TaskEntity> {
    const { title, description } = createTaskDto;
    const task: TaskModel = {
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };

    const newTask = this.taskRepository.create(task);
    await newTask.save({reload:true});
    console.log(newTask);
    return newTask;
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    let task: TaskEntity;

    task = await this.taskRepository.findOne({ where: { id:id } });

    // catch(err) {
    //     throw new InternalServerErrorException(err);
    // }

    if (!task) {
      throw new NotFoundException('No Task exists with this ID');
    }

    return task;
  }

  async deleteTask(id: string):Promise<string> {
      const remaining = await this.taskRepository.delete({id : id});
       return "task deleted successfully!";
  }

  async updateTaskStatus(id:string , status:TaskStatus) : Promise<TaskEntity> {
      const task = await this.taskRepository.findOne({where : {id : id}});
      task.status = status;
      task.save();
      return task;
  }
}
