import { Test, TestingModule } from '@nestjs/testing';
import { AreaCultivoController } from './area_cultivo.controller';
import { AreaCultivoService } from './area_cultivo.service';

describe('AreaCultivoController', () => {
  let controller: AreaCultivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreaCultivoController],
      providers: [AreaCultivoService],
    }).compile();

    controller = module.get<AreaCultivoController>(AreaCultivoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
