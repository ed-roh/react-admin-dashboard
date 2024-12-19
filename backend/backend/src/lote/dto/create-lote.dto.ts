import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLoteDto {
  @IsNotEmpty()
  @IsNumber()
  area_cultivo_id: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  data_inicio: Date;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  observacoes: string;
}
