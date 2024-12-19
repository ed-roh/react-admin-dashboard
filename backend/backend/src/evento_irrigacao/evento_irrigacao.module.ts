import { Module } from '@nestjs/common';
import { EventoIrrigacaoService } from './evento_irrigacao.service';
import { EventoIrrigacaoController } from './evento_irrigacao.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EventoIrrigacaoController],
  providers: [EventoIrrigacaoService, PrismaService],
  exports: [EventoIrrigacaoService],
})
export class EventoIrrigacaoModule {}
