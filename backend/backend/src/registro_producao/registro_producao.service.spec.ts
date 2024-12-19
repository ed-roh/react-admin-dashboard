import { Test, TestingModule } from '@nestjs/testing';
import { RegistroProducaoService } from './registro_producao.service';

describe('RegistroProducaoService', () => {
  let service: RegistroProducaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroProducaoService],
    }).compile();

    service = module.get<RegistroProducaoService>(RegistroProducaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
