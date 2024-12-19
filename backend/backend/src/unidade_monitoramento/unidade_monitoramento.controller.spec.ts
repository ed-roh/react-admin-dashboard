import { Test, TestingModule } from '@nestjs/testing';
import { UnidadeMonitoramentoController } from './unidade_monitoramento.controller';
import { UnidadeMonitoramentoService } from './unidade_monitoramento.service';

describe('UnidadeMonitoramentoController', () => {
  let controller: UnidadeMonitoramentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnidadeMonitoramentoController],
      providers: [UnidadeMonitoramentoService],
    }).compile();

    controller = module.get<UnidadeMonitoramentoController>(
      UnidadeMonitoramentoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
