import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeituraSensorService } from './leitura_sensor.service';
import { CreateLeituraSensorDto } from './dto/create-leitura_sensor.dto';
import { UpdateLeituraSensorDto } from './dto/update-leitura_sensor.dto';

@Controller('leitura-sensor')
export class LeituraSensorController {
  constructor(private readonly leituraSensorService: LeituraSensorService) {}

  @Post()
  create(@Body() createLeituraSensorDto: CreateLeituraSensorDto) {
    return this.leituraSensorService.create(createLeituraSensorDto);
  }

  @Get()
  findAll() {
    return this.leituraSensorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leituraSensorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeituraSensorDto: UpdateLeituraSensorDto,
  ) {
    return this.leituraSensorService.update(+id, updateLeituraSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leituraSensorService.remove(+id);
  }
}
