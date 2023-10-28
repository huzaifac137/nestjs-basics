import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, Res, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { TasksService } from './tasks.service';
import { title } from 'process';
import { createTaskDTO } from './dto/create-task.dto';
import { TaskStatusValidation } from './pipes/task-status-validator.pipe';
import { TaskStatus } from './taskStatus.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { DeepPartial } from 'typeorm';
import { AuthEntity } from 'src/auth/auth.entity';

@Controller('tasks')

export class TasksController {
   constructor(private tasksService:TasksService ) {}
    
   @Get()
   @UseGuards(AuthGuard)
   async getTasks(@Param() params:any , @Res() res:Response , @Req() req : Request):Promise<void> {
         if(!req?.user?.userId)
         {
           throw new UnauthorizedException("Not authorized");
         }    
        const tasks= await this.tasksService.getAllTasks();
        res.status(200).json({tasks});
   }

   @Post("create")
   @UsePipes(ValidationPipe)
   @UseGuards(AuthGuard)
   async createNewTask(@Body() createTasksDto : any , @Req() req: Request , @Res() res: Response) : Promise<void> {
       const creator = req.user.userId;
       if(!req?.user?.userId)
       {
         throw new UnauthorizedException("Not authorized");
       }   
    const newTask = await this.tasksService.createTask({ creator ,...createTasksDto});
     res.status(201).json({newTask});
   }
   
   @Get(":id")
   @UseGuards(AuthGuard)
  async  getTaskById(@Param("id" ) id:string , @Res() res:Response , @Req() req:Request) :Promise<void> {
    if(!req?.user?.userId)
    {
      throw new UnauthorizedException("Not authorized");
    }   
    const task = await this.tasksService.getTaskById(id);
     res.status(200).json({task});
   }

   @Delete(":id")
   @UseGuards(AuthGuard)
   async deleteTask(@Param("id" ) id:string , @Res() res:Response ,  @Req() req:Request) :Promise<void> {
    if(!req?.user?.userId )
    {
      throw new UnauthorizedException("Not authorized");
    }   
    const task = await this.tasksService.deleteTask(id , req.user.userId as DeepPartial<AuthEntity>);
     res.status(201).json({message : task});
   }

   @Patch(":id/status")
   @UseGuards(AuthGuard)
   async updateTaskStatus(@Param("id") id:string , @Body("status" , TaskStatusValidation) status : TaskStatus 
   , @Res() res:Response ,  @Req() req:Request): Promise<void> {
    if(!req?.user?.userId)
    {
      throw new UnauthorizedException("Not authorized");
    }   
    const updatedTask = await this.tasksService.updateTaskStatus(id ,  status , req?.user?.userId as DeepPartial<AuthEntity>);
        res.status(201).json({updatedTask});
   }
}
