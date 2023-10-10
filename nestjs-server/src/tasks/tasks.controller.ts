import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { TasksService } from './tasks.service';
import { title } from 'process';
import { createTaskDTO } from './dto/create-task.dto';
import { TaskStatusValidation } from './pipes/task-status-validator.pipe';
import { TaskStatus } from './taskStatus.enum';

@Controller('tasks')

export class TasksController {
   constructor(private tasksService:TasksService ) {}
    
   @Get()
   async getTasks(@Param() params:any , @Res() res:Response):Promise<void> {
        const tasks= await this.tasksService.getAllTasks();
        res.status(200).json({tasks});
   }

   @Post("create")
   @UsePipes(ValidationPipe)
   async createNewTask(@Body() createTasksDto : createTaskDTO , @Res() res: Response) : Promise<void> {
    const newTask = await this.tasksService.createTask(createTasksDto);
     res.status(201).json({newTask});
   }

   @Get(":id")
  async  getTaskById(@Param("id" ) id:string , @Res() res:Response) :Promise<void> {
    const task = await this.tasksService.getTaskById(id);
     res.status(200).json({task});
   }

   @Delete(":id")
   async deleteTask(@Param("id" ) id:string , @Res() res:Response) :Promise<void> {
    const task = await this.tasksService.deleteTask(id);
     res.status(201).json({message : task});
   }

   @Patch(":id/status")
   async updateTaskStatus(@Param("id") id:string , @Body("status" , TaskStatusValidation) status : TaskStatus , @Res() res:Response): Promise<void> {
       const updatedTask = await this.tasksService.updateTaskStatus(id ,  status);
        res.status(201).json({updatedTask});
   }
}
