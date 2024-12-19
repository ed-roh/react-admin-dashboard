import { Test, TestingModule } from '@nestjs/testing';
import { LeituraSensorService } from './leitura_sensor.service';

describe('LeituraSensorService', () => {
  let service: LeituraSensorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeituraSensorService],
    }).compile();

    service = module.get<LeituraSensorService>(LeituraSensorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
