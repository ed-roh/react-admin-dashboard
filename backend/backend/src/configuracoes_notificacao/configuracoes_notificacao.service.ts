import { Injectable } from '@nestjs/common';
import { CreateConfiguracoesNotificacaoDto } from './dto/create-configuracoes_notificacao.dto';
import { UpdateConfiguracoesNotificacaoDto } from './dto/update-configuracoes_notificacao.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConfiguracoesNotificacaoService {
  constructor(private prisma: PrismaService) {}

  async create(
    createConfiguracoesNotificacaoDto: CreateConfiguracoesNotificacaoDto,
  ) {
    return this.prisma.configuracoes_notificacao.create({
      data: createConfiguracoesNotificacaoDto,
    });
  }

  async findAll() {
    return this.prisma.configuracoes_notificacao.findMany();
  }

  async findOne(id: number) {
    return this.prisma.configuracoes_notificacao.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateConfiguracoesNotificacaoDto: UpdateConfiguracoesNotificacaoDto,
  ) {
    return this.prisma.configuracoes_notificacao.update({
      where: { id },
      data: updateConfiguracoesNotificacaoDto,
    });
  }

  async remove(id: number) {
    return this.prisma.configuracoes_notificacao.delete({
      where: { id },
    });
  }
}
