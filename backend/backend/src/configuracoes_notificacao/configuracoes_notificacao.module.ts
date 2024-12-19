import { Module } from '@nestjs/common';
import { ConfiguracoesNotificacaoService } from './configuracoes_notificacao.service';
import { ConfiguracoesNotificacaoController } from './configuracoes_notificacao.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ConfiguracoesNotificacaoController],
  providers: [ConfiguracoesNotificacaoService, PrismaService],
  exports: [ConfiguracoesNotificacaoService],
})
export class ConfiguracoesNotificacaoModule {}
