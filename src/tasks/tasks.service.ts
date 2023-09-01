import { ForbiddenException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: {...dto}
    }); 
    return task; 
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {id}
    });

    if(!task){
      throw new ForbiddenException('Task not exist in DB, cannot find it');
    }
    return task;
  }

  async delete(id: number){
    const task = await this.prisma.task.findUnique({ where: {id}});
    if(!task){
      throw new ForbiddenException('Task not exist in DB, cannot delete it');
    }

    return this.prisma.task.delete({
      where: {id:id}
    });

  }

}
