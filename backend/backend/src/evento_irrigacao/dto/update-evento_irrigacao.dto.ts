import { PartialType } from '@nestjs/mapped-types';
import { CreateEventoIrrigacaoDto } from './create-evento_irrigacao.dto';

export class UpdateEventoIrrigacaoDto extends PartialType(
  CreateEventoIrrigacaoDto,
) {}
