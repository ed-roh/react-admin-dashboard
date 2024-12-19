import { Test, TestingModule } from '@nestjs/testing';
import { RegistroProducaoController } from './registro_producao.controller';
import { RegistroProducaoService } from './registro_producao.service';

describe('RegistroProducaoController', () => {
  let controller: RegistroProducaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistroProducaoController],
      providers: [RegistroProducaoService],
    }).compile();

    controller = module.get<RegistroProducaoController>(
      RegistroProducaoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
