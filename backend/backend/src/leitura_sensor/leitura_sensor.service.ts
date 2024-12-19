import { Injectable } from '@nestjs/common';
import { CreateLeituraSensorDto } from './dto/create-leitura_sensor.dto';
import { UpdateLeituraSensorDto } from './dto/update-leitura_sensor.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeituraSensorService {
  constructor(private prisma: PrismaService) {
  }

  async create(createLeituraSensorDto: CreateLeituraSensorDto) {
    return this.prisma.leitura_sensor.create({ data: createLeituraSensorDto });
  }

  async findAll() {
    return this.prisma.leitura_sensor.findMany();
  }

  async findOne(id: number) {
    return this.prisma.leitura_sensor.findUnique({ where: { id } });
  }

  async update(id: number, updateLeituraSensorDto: UpdateLeituraSensorDto) {
    return this.prisma.leitura_sensor.update({
      where: { id: id },
      data: updateLeituraSensorDto,
    });
  }

  async remove(id: number) {
    return this.prisma.leitura_sensor.delete({ where: { id: id } });
  }
}
