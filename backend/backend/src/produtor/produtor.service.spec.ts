import { Test, TestingModule } from '@nestjs/testing';
import { ProdutorService } from './produtor.service';

describe('ProdutorService', () => {
  let service: ProdutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutorService],
    }).compile();

    service = module.get<ProdutorService>(ProdutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
