import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutorDto } from './create-produtor.dto';

export class UpdateProdutorDto extends PartialType(CreateProdutorDto) {}
