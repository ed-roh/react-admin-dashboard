import { Module } from '@nestjs/common';
import { LeituraSensorService } from './leitura_sensor.service';
import { LeituraSensorController } from './leitura_sensor.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LeituraSensorController],
  providers: [LeituraSensorService, PrismaService],
  exports: [LeituraSensorService],
})
export class LeituraSensorModule {}
