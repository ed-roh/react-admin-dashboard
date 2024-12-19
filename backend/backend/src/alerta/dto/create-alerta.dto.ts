import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlertaDto {
  @IsNotEmpty()
  @IsNumber()
  area_cultivo_id: number;

  @IsNotEmpty()
  @IsNumber()
  unidade_monitoramento_id: number;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  @IsString()
  mensagem: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
