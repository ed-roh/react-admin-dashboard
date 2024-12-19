import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRegistroProducaoDto {
  @IsNotEmpty()
  @IsNumber()
  lote_id: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  data: Date;

  @IsNotEmpty()
  @IsNumber()
  quantidade_tipo_a_kg: number;

  @IsNotEmpty()
  @IsNumber()
  quantidade_tipo_b_kg: number;

  @IsNotEmpty()
  @IsNumber()
  quantidade_tipo_c_kg: number;

  @IsNotEmpty()
  @IsObject()
  problemas_encontrados: object;

  @IsNotEmpty()
  @IsString()
  observacoes: string;
}
