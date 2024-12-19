import { IsString, IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateProdutorDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  senha: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsBoolean()
  ativo: boolean;
}
