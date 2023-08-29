import { StatusEnum } from "../entities/task.entity";

export class CreateTaskDto {
    title:string;
    description: string;
    status: StatusEnum;
    createdAt: Date;
    updatedAt: Date;
}


