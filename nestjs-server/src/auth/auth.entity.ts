import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}