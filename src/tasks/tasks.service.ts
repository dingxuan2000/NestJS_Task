import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Tasks) private readonly tasksRepository: Repository<Tasks>) { }

  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create(createTaskDto); //task = new Task(), task.title = title
    return await this.tasksRepository.save(task); //save into DB and return an object
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOne({ where: { id } });
    //check if task exists
    if(task == null)
      throw new HttpException('Id not found', HttpStatus.NOT_FOUND);
    return task;
  }

  async delete(id: number){
    const task = await this.tasksRepository.findOne({ where: {id}});
    //check if task exists
    console.log(task);
    if(task == null)
      throw new HttpException('Id not found, cannot delete', HttpStatus.NOT_FOUND);
    return await this.tasksRepository.remove(task);

  }


}
