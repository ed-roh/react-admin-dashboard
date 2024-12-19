import { Injectable } from '@nestjs/common';
import { CreateUnidadeMonitoramentoDto } from './dto/create-unidade_monitoramento.dto';
import { UpdateUnidadeMonitoramentoDto } from './dto/update-unidade_monitoramento.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UnidadeMonitoramentoService {
  constructor(private prisma: PrismaService) {}

  async create(createUnidadeMonitoramentoDto: CreateUnidadeMonitoramentoDto) {
    return this.prisma.unidade_monitoramento.create({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      data: createUnidadeMonitoramentoDto,
    });
  }

  async findAll() {
    return this.prisma.unidade_monitoramento.findMany();
  }

  async findOne(id: number) {
    return this.prisma.unidade_monitoramento.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateUnidadeMonitoramentoDto: UpdateUnidadeMonitoramentoDto,
  ) {
    return this.prisma.unidade_monitoramento.update({
      where: { id },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      data: updateUnidadeMonitoramentoDto,
    });
  }

  async remove(id: number) {
    return this.prisma.unidade_monitoramento.delete({
      where: { id },
    });
  }
}
