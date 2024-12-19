import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaCultivoDto } from './create-area_cultivo.dto';

export class UpdateAreaCultivoDto extends PartialType(CreateAreaCultivoDto) {}
