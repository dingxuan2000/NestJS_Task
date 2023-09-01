import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StatusEnum, Tasks } from './entities/task.entity';

describe('TasksService', () => {
  let service: TasksService;

  //mock all dependencies with TasksService
  const mockTasksRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(task => Promise.resolve({ id: Date.now(), ...task })),
    findOne: jest.fn(),
    delete: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService,
        {
          provide: getRepositoryToken(Tasks),
          useValue: mockTasksRepository,
        }],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => should create a new task record and return that', async () => {
    const dto = {
      title: 'Task I',
      description: 'implement create api',
      status: StatusEnum[0],
      createdAt: new Date('2023-08-10'),
      updatedAt: new Date('2023-08-30')
    };

    expect(await service.create(dto)).toEqual({
      id: expect.any(Number),
      title: dto.title,
      description: dto.description,
      status: dto.status,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt
    });
  });

  it('findOne => should find a task by a given id and return its data', async () => {
    //arrange
    const id = 1;
    const task = {
      id: 1,
      title: 'Task I',
      description: 'implement create api',
      status: 'TODO',
      createdAt: new Date('2023-08-10'), 
      updatedAt: new Date('2023-08-30')
    };
    jest.spyOn(mockTasksRepository, 'findOne').mockReturnValue(task);

    //act
    const result = await mockTasksRepository.findOne(id);
    expect(result).toEqual(task);
    expect(mockTasksRepository.findOne).toBeCalled();
    expect(mockTasksRepository.findOne).toBeCalledWith(id);
  });

  it('delete => should find a task by a given id, delete and return number of affected rows', async () => {
    const id = 1;
    const task = {
      id: 1,
      title: 'Task I',
      description: 'implement create api',
      status: 'TODO',
      createdAt: new Date('2023-08-10'),
      updatedAt: new Date('2023-08-30')
    };

    jest.spyOn(mockTasksRepository, 'delete').mockReturnValue(task);

    //act
    const result = await mockTasksRepository.delete(id);

    expect(result).toEqual(task);
    expect(mockTasksRepository.delete).toBeCalled();
    expect(mockTasksRepository.delete).toBeCalledWith(id);
  });
});
