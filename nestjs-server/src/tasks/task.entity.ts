import { BaseEntity, Column, DeepPartial, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./taskStatus.enum";
import { AuthEntity } from "src/auth/auth.entity";


@Entity()
export class TaskEntity extends BaseEntity{

    
    @PrimaryGeneratedColumn("uuid")
    id: string ;

    @Column()
    title : string ;
    @Column()
    description : string ;
    @Column()
    status : TaskStatus;

    @ManyToOne(()=> AuthEntity , (user)=> user.tasks)
    @JoinColumn({name :"creator"})
    creator : AuthEntity
    
};