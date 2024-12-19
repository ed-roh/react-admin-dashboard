import { Test, TestingModule } from '@nestjs/testing';
import { ConfiguracoesNotificacaoController } from './configuracoes_notificacao.controller';
import { ConfiguracoesNotificacaoService } from './configuracoes_notificacao.service';

describe('ConfiguracoesNotificacaoController', () => {
  let controller: ConfiguracoesNotificacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfiguracoesNotificacaoController],
      providers: [ConfiguracoesNotificacaoService],
    }).compile();

    controller = module.get<ConfiguracoesNotificacaoController>(
      ConfiguracoesNotificacaoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
