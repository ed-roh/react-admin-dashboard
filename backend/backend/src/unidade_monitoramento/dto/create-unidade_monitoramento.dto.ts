import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUnidadeMonitoramentoDto {
  @IsNotEmpty()
  @IsNumber()
  saco_cultivo_id: number;

  @IsNotEmpty()
  @IsNumber()
  codigo_serie: number;

  @IsNotEmpty()
  @IsBoolean()
  microaspersor_ativo: boolean;

  @IsNotEmpty()
  @IsBoolean()
  sensor_ativo: boolean;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  ultima_manutencao: Date;

  @IsNotEmpty()
  @IsNumber()
  vazao_media: number;
}
