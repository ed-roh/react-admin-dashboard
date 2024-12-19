import { Test, TestingModule } from '@nestjs/testing';
import { LoteService } from './lote.service';

describe('LoteService', () => {
  let service: LoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoteService],
    }).compile();

    service = module.get<LoteService>(LoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
