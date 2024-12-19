import { Injectable } from '@nestjs/common';
import { CreateAreaCultivoDto } from './dto/create-area_cultivo.dto';
import { UpdateAreaCultivoDto } from './dto/update-area_cultivo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AreaCultivoService {
  constructor(private prisma: PrismaService) {}

  async create(createAreaCultivoDto: CreateAreaCultivoDto) {
    return this.prisma.area_cultivo.create({ data: createAreaCultivoDto });
  }

  async findAll() {
    return this.prisma.area_cultivo.findMany();
  }

  async findOne(id: number) {
    return this.prisma.area_cultivo.findUnique({ where: { id: id } });
  }

  async update(id: number, updateAreaCultivoDto: UpdateAreaCultivoDto) {
    return this.prisma.area_cultivo.update({
      where: { id: id },
      data: updateAreaCultivoDto,
    });
  }

  async remove(id: number) {
    return this.prisma.area_cultivo.delete({ where: { id: id } });
  }
}
