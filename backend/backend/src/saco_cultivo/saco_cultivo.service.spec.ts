import { Test, TestingModule } from '@nestjs/testing';
import { SacoCultivoService } from './saco_cultivo.service';

describe('SacoCultivoService', () => {
  let service: SacoCultivoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SacoCultivoService],
    }).compile();

    service = module.get<SacoCultivoService>(SacoCultivoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
