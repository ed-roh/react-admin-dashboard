import { Injectable } from '@nestjs/common';
import { CreateEventoIrrigacaoDto } from './dto/create-evento_irrigacao.dto';
import { UpdateEventoIrrigacaoDto } from './dto/update-evento_irrigacao.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventoIrrigacaoService {
  constructor(private prisma: PrismaService) {}

  async create(createEventoIrrigacaoDto: CreateEventoIrrigacaoDto) {
    return this.prisma.evento_irrigacao.create({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      data: createEventoIrrigacaoDto,
    });
  }

  async findAll() {
    return this.prisma.evento_irrigacao.findMany();
  }

  async findOne(id: number) {
    return this.prisma.evento_irrigacao.findUnique({ where: { id } });
  }

  async update(id: number, updateEventoIrrigacaoDto: UpdateEventoIrrigacaoDto) {
    return this.prisma.evento_irrigacao.update({
      where: { id },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      data: updateEventoIrrigacaoDto,
    });
  }

  async remove(id: number) {
    return this.prisma.evento_irrigacao.delete({
      where: { id },
    });
  }
}
