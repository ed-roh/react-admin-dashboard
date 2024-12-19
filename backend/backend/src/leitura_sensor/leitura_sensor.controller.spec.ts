import { Test, TestingModule } from '@nestjs/testing';
import { LeituraSensorController } from './leitura_sensor.controller';
import { LeituraSensorService } from './leitura_sensor.service';

describe('LeituraSensorController', () => {
  let controller: LeituraSensorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeituraSensorController],
      providers: [LeituraSensorService],
    }).compile();

    controller = module.get<LeituraSensorController>(LeituraSensorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
