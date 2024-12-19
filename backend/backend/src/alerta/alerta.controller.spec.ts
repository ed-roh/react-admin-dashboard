import { Test, TestingModule } from '@nestjs/testing';
import { AlertaController } from './alerta.controller';
import { AlertaService } from './alerta.service';

describe('AlertaController', () => {
  let controller: AlertaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertaController],
      providers: [AlertaService],
    }).compile();

    controller = module.get<AlertaController>(AlertaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
