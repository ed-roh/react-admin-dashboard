import { Module } from '@nestjs/common';
import { RegistroProducaoService } from './registro_producao.service';
import { RegistroProducaoController } from './registro_producao.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RegistroProducaoController],
  providers: [RegistroProducaoService, PrismaService],
  exports: [RegistroProducaoService],
})
export class RegistroProducaoModule {}
