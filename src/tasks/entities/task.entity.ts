import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum StatusEnum{
    TODO = "TODO", 
    IN_PROGRESS = "IN_PROGRESS", 
    COMPLETED = "COMPLETED"
}


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