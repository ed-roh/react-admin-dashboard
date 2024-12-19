import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventoIrrigacaoService } from './evento_irrigacao.service';
import { CreateEventoIrrigacaoDto } from './dto/create-evento_irrigacao.dto';
import { UpdateEventoIrrigacaoDto } from './dto/update-evento_irrigacao.dto';

@Controller('evento-irrigacao')
export class EventoIrrigacaoController {
  constructor(
    private readonly eventoIrrigacaoService: EventoIrrigacaoService,
  ) {}

  @Post()
  create(@Body() createEventoIrrigacaoDto: CreateEventoIrrigacaoDto) {
    return this.eventoIrrigacaoService.create(createEventoIrrigacaoDto);
  }

  @Get()
  findAll() {
    return this.eventoIrrigacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventoIrrigacaoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventoIrrigacaoDto: UpdateEventoIrrigacaoDto,
  ) {
    return this.eventoIrrigacaoService.update(+id, updateEventoIrrigacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventoIrrigacaoService.remove(+id);
  }
}
