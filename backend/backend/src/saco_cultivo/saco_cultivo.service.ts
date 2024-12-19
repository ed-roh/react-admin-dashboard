import { Injectable } from '@nestjs/common';
import { CreateSacoCultivoDto } from './dto/create-saco_cultivo.dto';
import { UpdateSacoCultivoDto } from './dto/update-saco_cultivo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SacoCultivoService {
  constructor(private prisma: PrismaService) {}

  async create(createSacoCultivoDto: CreateSacoCultivoDto) {
    return this.prisma.saco_cultivo.create({ data: createSacoCultivoDto });
  }

  async findAll() {
    return this.prisma.saco_cultivo.findMany();
  }

  async findOne(id: number) {
    return this.prisma.saco_cultivo.findUnique({ where: { id: id } });
  }

  async update(id: number, updateSacoCultivoDto: UpdateSacoCultivoDto) {
    return this.prisma.saco_cultivo.update({
      where: { id: id },
      data: updateSacoCultivoDto,
    });
  }

  async remove(id: number) {
    return this.prisma.saco_cultivo.delete({
      where: { id: id },
    });
  }
}
