import { PartialType } from '@nestjs/mapped-types';
import { CreateLoteDto } from './create-lote.dto';

export class UpdateLoteDto extends PartialType(CreateLoteDto) {}
