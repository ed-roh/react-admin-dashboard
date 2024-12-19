import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UnidadeMonitoramentoService } from './unidade_monitoramento.service';
import { CreateUnidadeMonitoramentoDto } from './dto/create-unidade_monitoramento.dto';
import { UpdateUnidadeMonitoramentoDto } from './dto/update-unidade_monitoramento.dto';

@Controller('unidade-monitoramento')
export class UnidadeMonitoramentoController {
  constructor(
    private readonly unidadeMonitoramentoService: UnidadeMonitoramentoService,
  ) {}

  @Post()
  create(@Body() createUnidadeMonitoramentoDto: CreateUnidadeMonitoramentoDto) {
    return this.unidadeMonitoramentoService.create(
      createUnidadeMonitoramentoDto,
    );
  }

  @Get()
  findAll() {
    return this.unidadeMonitoramentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unidadeMonitoramentoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUnidadeMonitoramentoDto: UpdateUnidadeMonitoramentoDto,
  ) {
    return this.unidadeMonitoramentoService.update(
      +id,
      updateUnidadeMonitoramentoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadeMonitoramentoService.remove(+id);
  }
}
