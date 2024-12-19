import { PartialType } from '@nestjs/mapped-types';
import { CreateSacoCultivoDto } from './create-saco_cultivo.dto';

export class UpdateSacoCultivoDto extends PartialType(CreateSacoCultivoDto) {}
