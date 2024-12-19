import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SacoCultivoService } from './saco_cultivo.service';
import { CreateSacoCultivoDto } from './dto/create-saco_cultivo.dto';
import { UpdateSacoCultivoDto } from './dto/update-saco_cultivo.dto';

@Controller('saco-cultivo')
export class SacoCultivoController {
  constructor(private readonly sacoCultivoService: SacoCultivoService) {}

  @Post()
  create(@Body() createSacoCultivoDto: CreateSacoCultivoDto) {
    return this.sacoCultivoService.create(createSacoCultivoDto);
  }

  @Get()
  findAll() {
    return this.sacoCultivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sacoCultivoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSacoCultivoDto: UpdateSacoCultivoDto,
  ) {
    return this.sacoCultivoService.update(+id, updateSacoCultivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sacoCultivoService.remove(+id);
  }
}
