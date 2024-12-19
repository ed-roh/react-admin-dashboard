import { Module } from '@nestjs/common';
import { UnidadeMonitoramentoService } from './unidade_monitoramento.service';
import { UnidadeMonitoramentoController } from './unidade_monitoramento.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UnidadeMonitoramentoController],
  providers: [UnidadeMonitoramentoService, PrismaService],
  exports: [UnidadeMonitoramentoService],
})
export class UnidadeMonitoramentoModule {}
