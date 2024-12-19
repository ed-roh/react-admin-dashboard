import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutorModule } from './produtor/produtor.module';
import { ConfiguracoesNotificacaoModule } from './configuracoes_notificacao/configuracoes_notificacao.module';
import { AreaCultivoModule } from './area_cultivo/area_cultivo.module';
import { SacoCultivoModule } from './saco_cultivo/saco_cultivo.module';
import { UnidadeMonitoramentoModule } from './unidade_monitoramento/unidade_monitoramento.module';
import { LeituraSensorModule } from './leitura_sensor/leitura_sensor.module';
import { EventoIrrigacaoModule } from './evento_irrigacao/evento_irrigacao.module';
import { LoteModule } from './lote/lote.module';
import { RegistroProducaoModule } from './registro_producao/registro_producao.module';
import { AlertaModule } from './alerta/alerta.module';

@Module({
  imports: [
    PrismaModule,
    ProdutorModule,
    ConfiguracoesNotificacaoModule,
    AreaCultivoModule,
    SacoCultivoModule,
    UnidadeMonitoramentoModule,
    LeituraSensorModule,
    EventoIrrigacaoModule,
    LoteModule,
    RegistroProducaoModule,
    AlertaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
