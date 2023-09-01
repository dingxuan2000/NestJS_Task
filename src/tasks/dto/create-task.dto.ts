import { Field, registerEnumType } from '@nestjs/graphql';
import {
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';

export enum StatusEnum{
        TODO = "TODO", 
        IN_PROGRESS = "IN_PROGRESS", 
        COMPLETED = "COMPLETED"
}

registerEnumType(StatusEnum, {
    name: 'StatusEnum',
  });

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(StatusEnum)
    @Field(() => StatusEnum, { nullable: false })
    status: StatusEnum;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}



