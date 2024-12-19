import { Test, TestingModule } from '@nestjs/testing';
import { ProdutorController } from './produtor.controller';
import { ProdutorService } from './produtor.service';

describe('ProdutorController', () => {
  let controller: ProdutorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutorController],
      providers: [ProdutorService],
    }).compile();

    controller = module.get<ProdutorController>(ProdutorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
