import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadeMonitoramentoDto } from './create-unidade_monitoramento.dto';

export class UpdateUnidadeMonitoramentoDto extends PartialType(
  CreateUnidadeMonitoramentoDto,
) {}
