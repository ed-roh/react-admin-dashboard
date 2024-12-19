import { Test, TestingModule } from '@nestjs/testing';
import { ConfiguracoesNotificacaoService } from './configuracoes_notificacao.service';

describe('ConfiguracoesNotificacaoService', () => {
  let service: ConfiguracoesNotificacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfiguracoesNotificacaoService],
    }).compile();

    service = module.get<ConfiguracoesNotificacaoService>(
      ConfiguracoesNotificacaoService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
