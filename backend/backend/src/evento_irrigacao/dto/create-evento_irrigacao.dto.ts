import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventoIrrigacaoDto {
  @IsNotEmpty()
  @IsNumber()
  area_cultivo_id: number;

  @IsNotEmpty()
  @IsNumber()
  unidade_monitoramento_id: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  inicio: Date;

  @IsNotEmpty()
  @IsDate()
  fim: Date;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  @IsNumber()
  volume_agua: number;
}
