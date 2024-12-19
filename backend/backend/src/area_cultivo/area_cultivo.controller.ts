import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AreaCultivoService } from './area_cultivo.service';
import { CreateAreaCultivoDto } from './dto/create-area_cultivo.dto';
import { UpdateAreaCultivoDto } from './dto/update-area_cultivo.dto';

@Controller('area-cultivo')
export class AreaCultivoController {
  constructor(private readonly areaCultivoService: AreaCultivoService) {}

  @Post()
  create(@Body() createAreaCultivoDto: CreateAreaCultivoDto) {
    return this.areaCultivoService.create(createAreaCultivoDto);
  }

  @Get()
  findAll() {
    return this.areaCultivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaCultivoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAreaCultivoDto: UpdateAreaCultivoDto,
  ) {
    return this.areaCultivoService.update(+id, updateAreaCultivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areaCultivoService.remove(+id);
  }
}
