import { Test, TestingModule } from '@nestjs/testing';
import { AlertaService } from './alerta.service';

describe('AlertaService', () => {
  let service: AlertaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlertaService],
    }).compile();

    service = module.get<AlertaService>(AlertaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
