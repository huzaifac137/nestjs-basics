import { UUID } from "crypto";
import { TaskStatus } from "./taskStatus.enum";
import { DeepPartial } from "typeorm";
import { AuthEntity } from "src/auth/auth.entity";

export interface TaskModel {
  description : string ,
  title : string ,
  status : TaskStatus ,
  creator : DeepPartial<AuthEntity>
  
}
