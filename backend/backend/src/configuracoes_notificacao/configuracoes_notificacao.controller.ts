import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConfiguracoesNotificacaoService } from './configuracoes_notificacao.service';
import { CreateConfiguracoesNotificacaoDto } from './dto/create-configuracoes_notificacao.dto';
import { UpdateConfiguracoesNotificacaoDto } from './dto/update-configuracoes_notificacao.dto';

@Controller('configuracoes-notificacao')
export class ConfiguracoesNotificacaoController {
  constructor(
    private readonly configuracoesNotificacaoService: ConfiguracoesNotificacaoService,
  ) {}

  @Post()
  create(
    @Body()
    createConfiguracoesNotificacaoDto: CreateConfiguracoesNotificacaoDto,
  ) {
    return this.configuracoesNotificacaoService.create(
      createConfiguracoesNotificacaoDto,
    );
  }

  @Get()
  findAll() {
    return this.configuracoesNotificacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configuracoesNotificacaoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateConfiguracoesNotificacaoDto: UpdateConfiguracoesNotificacaoDto,
  ) {
    return this.configuracoesNotificacaoService.update(
      +id,
      updateConfiguracoesNotificacaoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configuracoesNotificacaoService.remove(+id);
  }
}
