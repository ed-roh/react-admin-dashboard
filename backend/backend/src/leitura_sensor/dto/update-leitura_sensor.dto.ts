import { PartialType } from '@nestjs/mapped-types';
import { CreateLeituraSensorDto } from './create-leitura_sensor.dto';

export class UpdateLeituraSensorDto extends PartialType(
  CreateLeituraSensorDto,
) {}
