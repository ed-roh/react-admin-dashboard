import { Injectable } from '@nestjs/common';
import { CreateRegistroProducaoDto } from './dto/create-registro_producao.dto';
import { UpdateRegistroProducaoDto } from './dto/update-registro_producao.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegistroProducaoService {
  constructor(private prisma: PrismaService) {}

  async create(createRegistroProducaoDto: CreateRegistroProducaoDto) {
    return this.prisma.registro_producao.create({
      data: createRegistroProducaoDto,
    });
  }

  async findAll() {
    return this.prisma.registro_producao.findMany();
  }

  async findOne(id: number) {
    return this.prisma.registro_producao.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateRegistroProducaoDto: UpdateRegistroProducaoDto,
  ) {
    return this.prisma.registro_producao.update({
      where: { id },
      data: updateRegistroProducaoDto,
    });
  }

  async remove(id: number) {
    return this.prisma.registro_producao.delete({
      where: { id },
    });
  }
}
