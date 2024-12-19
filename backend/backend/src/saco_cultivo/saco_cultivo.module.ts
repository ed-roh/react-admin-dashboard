import { Module } from '@nestjs/common';
import { SacoCultivoService } from './saco_cultivo.service';
import { SacoCultivoController } from './saco_cultivo.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SacoCultivoController],
  providers: [SacoCultivoService, PrismaService],
  exports: [SacoCultivoService],
})
export class SacoCultivoModule {}
