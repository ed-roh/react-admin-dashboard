import { Module } from '@nestjs/common';
import { LoteService } from './lote.service';
import { LoteController } from './lote.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LoteController],
  providers: [LoteService, PrismaService],
  exports: [LoteService],
})
export class LoteModule {}
