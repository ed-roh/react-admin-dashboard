import { Injectable } from '@nestjs/common';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LoteService {
  constructor(private prisma: PrismaService) {}

  async create(createLoteDto: CreateLoteDto) {
    return this.prisma.lote.create({ data: createLoteDto });
  }

  async findAll() {
    return this.prisma.lote.findMany();
  }

  async findOne(id: number) {
    return this.prisma.lote.findUnique({ where: { id } });
  }

  async update(id: number, updateLoteDto: UpdateLoteDto) {
    return this.prisma.lote.update({
      where: { id: id },
      data: updateLoteDto,
    });
  }

  async remove(id: number) {
    return this.prisma.lote.delete({
      where: { id: id },
    });
  }
}
