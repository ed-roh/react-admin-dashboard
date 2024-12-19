import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegistroProducaoService } from './registro_producao.service';
import { CreateRegistroProducaoDto } from './dto/create-registro_producao.dto';
import { UpdateRegistroProducaoDto } from './dto/update-registro_producao.dto';

@Controller('registro-producao')
export class RegistroProducaoController {
  constructor(
    private readonly registroProducaoService: RegistroProducaoService,
  ) {}

  @Post()
  create(@Body() createRegistroProducaoDto: CreateRegistroProducaoDto) {
    return this.registroProducaoService.create(createRegistroProducaoDto);
  }

  @Get()
  findAll() {
    return this.registroProducaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registroProducaoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegistroProducaoDto: UpdateRegistroProducaoDto,
  ) {
    return this.registroProducaoService.update(+id, updateRegistroProducaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registroProducaoService.remove(+id);
  }
}
