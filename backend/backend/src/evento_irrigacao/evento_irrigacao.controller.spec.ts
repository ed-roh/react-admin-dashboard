import { Test, TestingModule } from '@nestjs/testing';
import { EventoIrrigacaoController } from './evento_irrigacao.controller';
import { EventoIrrigacaoService } from './evento_irrigacao.service';

describe('EventoIrrigacaoController', () => {
  let controller: EventoIrrigacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventoIrrigacaoController],
      providers: [EventoIrrigacaoService],
    }).compile();

    controller = module.get<EventoIrrigacaoController>(
      EventoIrrigacaoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
