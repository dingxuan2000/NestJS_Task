import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TypeOrmModule]
})
export class TasksModule {}
