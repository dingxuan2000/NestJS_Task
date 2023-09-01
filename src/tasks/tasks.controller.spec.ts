import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';


describe('TasksController', () => {
  let controller: TasksController;

  //mock TasksSrvice: that we don't want to test!
  const mockTasksService = {
    //fake implementation of create method
    create: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto
      }
    }),

    findOne: jest.fn(),
    delete: jest.fn()

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).overrideProvider(TasksService).useValue(mockTasksService).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  // it('create => should create a new task and return its data', () => {
  //   const createTaskDTO = {
  //     title: 'Task I',
  //     description: 'implement create api',
  //     //status: StatusEnum[0],
  //     createdAt: new Date('2023-08-10'), 
  //     updatedAt: new Date('2023-08-30')
  //   };
  //   expect(controller.create(createTaskDTO)).toEqual({
  //     id: expect.any(Number),
  //     title: createTaskDTO.title,
  //     description: createTaskDTO.description,
  //     status: createTaskDTO.status,
  //     createdAt: createTaskDTO.createdAt, 
  //     updatedAt: createTaskDTO.updatedAt
  //   });

  //   expect(mockTasksService.create).toHaveBeenCalledWith(createTaskDTO);
  // });


  // it('findOne => should find a task by a given id and return its data', () => {
  //   //arrange
  //   const id = 1;
  //   const task = {
  //     id: 1,
  //     title: 'Task I',
  //     description: 'implement create api',
  //     status: 'TODO',
  //     createdAt: new Date('2023-08-10'), 
  //     updatedAt: new Date('2023-08-30')
  //   };
  //   jest.spyOn(mockTasksService, 'findOne').mockReturnValue(task);

  //   //act
  //   const result =  controller.findOne(id);

  //   expect(result).toEqual(task);
  //   expect(mockTasksService.findOne).toBeCalled();
  //   expect(mockTasksService.findOne).toBeCalledWith(+id);

  // });

  // it('delete => should find a task by a given id, delete and return number of affected rows', async () => {
  //   const id = 1;
  //   const task = {
  //     id: 1,
  //     title: 'Task I',
  //     description: 'implement create api',
  //     status: 'TODO',
  //     createdAt: new Date('2023-08-10'), 
  //     updatedAt: new Date('2023-08-30')
  //   };

  //   jest.spyOn(mockTasksService, 'delete').mockReturnValue(task);

  //   //act
  //   const result = await mockTasksService.delete(id);

  //   expect(result).toEqual(task);
  //   expect(mockTasksService.delete).toBeCalled();
  //   expect(mockTasksService.delete).toBeCalledWith(+id);
  // });

});
