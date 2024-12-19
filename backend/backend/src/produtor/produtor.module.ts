import { Module } from '@nestjs/common';
import { ProdutorService } from './produtor.service';
import { ProdutorController } from './produtor.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ProdutorController],
  providers: [ProdutorService, PrismaService],
  exports: [ProdutorService],
})
export class ProdutorModule {}
