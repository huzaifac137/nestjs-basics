import { TaskStatus } from "./taskStatus.enum";

export interface TaskModel {
  description : string ,
  title : string ,
  status : TaskStatus ,
  creator : string
  
}
