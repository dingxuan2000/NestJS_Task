import { Field, registerEnumType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// export enum StatusEnum{
//     TODO, IN_PROGRESS, COMPLETED
// }

export enum StatusEnum{
    TODO = "TODO", 
    IN_PROGRESS = "IN_PROGRESS", 
    COMPLETED = "COMPLETED"
}

// registerEnumType(StatusEnum, {
//     name: 'StatusEnum',
// });

@Entity({ name: 'tasks' })
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

//   @Field(type => StatusEnum)
//   status: StatusEnum;

    @Column({
        type: "enum",
        enum: StatusEnum,
        default: StatusEnum.TODO  
    })
    status: StatusEnum;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}