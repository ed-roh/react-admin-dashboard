import { PartialType } from '@nestjs/mapped-types';
import { CreateConfiguracoesNotificacaoDto } from './create-configuracoes_notificacao.dto';

export class UpdateConfiguracoesNotificacaoDto extends PartialType(
  CreateConfiguracoesNotificacaoDto,
) {}
