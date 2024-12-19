import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertaDto } from './create-alerta.dto';

export class UpdateAlertaDto extends PartialType(CreateAlertaDto) {}
