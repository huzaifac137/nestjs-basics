import { DataSource, EntityRepository, Repository } from "typeorm";
import {Injectable} from "@nestjs/common"

import { TaskEntity } from "./task.entity";

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
    constructor(private dataSource: DataSource)
    {
        super(TaskEntity, dataSource.createEntityManager());
        
    }
};