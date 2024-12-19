import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLeituraSensorDto {
  @IsNotEmpty()
  @IsNumber()
  unidade_monitoramento_id: number;

  @IsNotEmpty()
  @IsNumber()
  area_cultivo_id: number;

  @IsNotEmpty()
  @IsNumber()
  umidade_substrato: number;

  @IsNotEmpty()
  @IsNumber()
  umidade_ambiente: number;
}
