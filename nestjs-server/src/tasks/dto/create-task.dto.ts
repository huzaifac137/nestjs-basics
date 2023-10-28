import {IsNotEmpty} from "class-validator";
import { UUID } from "crypto";
import { AuthEntity } from "src/auth/auth.entity";
import { DeepPartial } from "typeorm";

export class createTaskDTO {

    @IsNotEmpty()
    title : string;
    @IsNotEmpty()
    description : string ;

    @IsNotEmpty()
    creator: DeepPartial<AuthEntity>
}
