import { Injectable } from '@nestjs/common';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { UpdateProdutorDto } from './dto/update-produtor.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProdutorService {
  constructor(private prisma: PrismaService) {}

  async create(createProdutorDto: CreateProdutorDto) {
    return this.prisma.produtor.create({ data: createProdutorDto });
  }

  async findAll() {
    return this.prisma.produtor.findMany();
  }

  async findOne(id: number) {
    return this.prisma.produtor.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateProdutorDto: UpdateProdutorDto) {
    return this.prisma.produtor.update({
      where: { id: id },
      data: updateProdutorDto,
    });
  }

  async remove(id: number) {
    return this.prisma.produtor.delete({
      where: { id: id },
    });
  }
}
