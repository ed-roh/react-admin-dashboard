import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlertaService } from './alerta.service';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { UpdateAlertaDto } from './dto/update-alerta.dto';

@Controller('alerta')
export class AlertaController {
  constructor(private readonly alertaService: AlertaService) {}

  @Post()
  create(@Body() createAlertaDto: CreateAlertaDto) {
    return this.alertaService.create(createAlertaDto);
  }

  @Get()
  findAll() {
    return this.alertaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlertaDto: UpdateAlertaDto) {
    return this.alertaService.update(+id, updateAlertaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertaService.remove(+id);
  }
}
