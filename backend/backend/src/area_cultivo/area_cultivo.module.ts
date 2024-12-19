import { Module } from '@nestjs/common';
import { AreaCultivoService } from './area_cultivo.service';
import { AreaCultivoController } from './area_cultivo.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AreaCultivoController],
  providers: [AreaCultivoService, PrismaService],
  exports: [AreaCultivoService],
})
export class AreaCultivoModule {}
