import { Module } from '@nestjs/common';
import { AlertaService } from './alerta.service';
import { AlertaController } from './alerta.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AlertaController],
  providers: [AlertaService, PrismaService],
  exports: [AlertaService],
})
export class AlertaModule {}
