import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSacoCultivoDto {
  @IsNotEmpty()
  @IsNumber()
  area_cultivo_id: number;

  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsString()
  posicao: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  data_inicio: Date;

  @IsNotEmpty()
  @IsBoolean()
  ativo: boolean;
}
