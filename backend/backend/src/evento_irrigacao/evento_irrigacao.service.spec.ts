import { Test, TestingModule } from '@nestjs/testing';
import { EventoIrrigacaoService } from './evento_irrigacao.service';

describe('EventoIrrigacaoService', () => {
  let service: EventoIrrigacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventoIrrigacaoService],
    }).compile();

    service = module.get<EventoIrrigacaoService>(EventoIrrigacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
