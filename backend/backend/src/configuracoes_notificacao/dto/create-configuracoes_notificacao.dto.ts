import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConfiguracoesNotificacaoDto {
  @IsNotEmpty()
  @IsNumber()
  produtor_id: number;

  @IsNotEmpty()
  @IsString()
  telefone_para_notificar: string;
}
