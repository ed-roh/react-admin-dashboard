import { Test, TestingModule } from '@nestjs/testing';
import { AreaCultivoService } from './area_cultivo.service';

describe('AreaCultivoService', () => {
  let service: AreaCultivoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreaCultivoService],
    }).compile();

    service = module.get<AreaCultivoService>(AreaCultivoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
