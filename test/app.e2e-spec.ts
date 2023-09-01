import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto, StatusEnum } from '../src/tasks/dto/create-task.dto';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
//------------------------------------
const PORT = 3333;
pactum.request.setBaseUrl(`http://localhost:${PORT}`);
//------------------------------------


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(PORT);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Create Task', () => {
    const dto: CreateTaskDto = {
      title: 'Task I',
      description: 'implement create api',
      status: StatusEnum[0],
      createdAt: undefined,
      updatedAt: undefined
    };
    it('should create task', () => {
      const task = 
       pactum
        .spec()
        .post('/tasks')
        .withBody(dto)
        .expectStatus(201)
        .stores('taskId', 'id');
    });
  });

  describe('Get task by id', () => {
    it('should get task by id', () => {
      return pactum
        .spec()
        .get('/tasks/{id}')
        .withPathParams('id', '$S{taskId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(200)
        .expectBodyContains('$S{taskId}');
    });
  });

  describe('Delete task by id', () => {
    it('should delete task', () => {
      return pactum
        .spec()
        .delete('/tasks/{id}')
        .withPathParams('id', '$S{taskId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(204);
    });

});

});