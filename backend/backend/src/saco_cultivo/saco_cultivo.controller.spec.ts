import { Test, TestingModule } from '@nestjs/testing';
import { SacoCultivoController } from './saco_cultivo.controller';
import { SacoCultivoService } from './saco_cultivo.service';

describe('SacoCultivoController', () => {
  let controller: SacoCultivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SacoCultivoController],
      providers: [SacoCultivoService],
    }).compile();

    controller = module.get<SacoCultivoController>(SacoCultivoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
