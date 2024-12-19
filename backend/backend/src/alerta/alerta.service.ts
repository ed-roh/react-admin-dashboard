import { Injectable } from '@nestjs/common';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { UpdateAlertaDto } from './dto/update-alerta.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlertaService {
  constructor(private prisma: PrismaService) {}

  async create(createAlertaDto: CreateAlertaDto) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.prisma.alerta.create({ data: createAlertaDto });
  }

  async findAll() {
    return this.prisma.alerta.findMany();
  }

  async findOne(id: number) {
    return this.prisma.alerta.findUnique({ where: { id: id } });
  }

  async update(id: number, updateAlertaDto: UpdateAlertaDto) {
    return this.prisma.alerta.update({
      where: { id: id },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      data: updateAlertaDto,
    });
  }

  async remove(id: number) {
    return this.prisma.alerta.delete({ where: { id: id } });
  }
}
