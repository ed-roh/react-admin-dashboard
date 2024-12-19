import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroProducaoDto } from './create-registro_producao.dto';

export class UpdateRegistroProducaoDto extends PartialType(
  CreateRegistroProducaoDto,
) {}
