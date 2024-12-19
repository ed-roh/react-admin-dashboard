import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAreaCultivoDto {
  @IsNotEmpty()
  @IsNumber()
  produtor_id: number;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsBoolean()
  ativo: boolean;
}
