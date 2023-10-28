import { TaskEntity } from "src/tasks/task.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthEntity extends BaseEntity{
   @PrimaryGeneratedColumn("uuid")
   id : string

   @Column()
   email : string

   @Column()
   username : string

   @Column()
   password: string

   @OneToMany(()=> TaskEntity , (task)=> task.creator)
   @JoinColumn({name :"tasks"})
   tasks: TaskEntity[]

}