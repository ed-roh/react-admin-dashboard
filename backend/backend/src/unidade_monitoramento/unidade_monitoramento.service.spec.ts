import { Test, TestingModule } from '@nestjs/testing';
import { UnidadeMonitoramentoService } from './unidade_monitoramento.service';

describe('UnidadeMonitoramentoService', () => {
  let service: UnidadeMonitoramentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnidadeMonitoramentoService],
    }).compile();

    service = module.get<UnidadeMonitoramentoService>(
      UnidadeMonitoramentoService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
