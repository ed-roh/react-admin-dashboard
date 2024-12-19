-- CreateEnum
CREATE TYPE "TipoIrrigacao" AS ENUM ('manual', 'auto');

-- CreateEnum
CREATE TYPE "Qualidade" AS ENUM ('A', 'B', 'C');

-- CreateEnum
CREATE TYPE "StatusAlerta" AS ENUM ('resolvido', 'monitorando');

-- CreateTable
CREATE TABLE "produtor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL,

    CONSTRAINT "produtor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configuracoes_notificacao" (
    "id" SERIAL NOT NULL,
    "produtor_id" INTEGER NOT NULL,
    "telefone_para_notificar" TEXT NOT NULL,

    CONSTRAINT "configuracoes_notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area_cultivo" (
    "id" SERIAL NOT NULL,
    "produtor_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL,
    "umidade_min" DOUBLE PRECISION NOT NULL,
    "umidade_max" DOUBLE PRECISION NOT NULL,
    "tempo_irrigacao_padrao" INTEGER NOT NULL,
    "horarios_permitidos" JSONB NOT NULL,

    CONSTRAINT "area_cultivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saco_cultivo" (
    "id" SERIAL NOT NULL,
    "area_cultivo_id" INTEGER NOT NULL,
    "codigo" TEXT NOT NULL,
    "posicao" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL,

    CONSTRAINT "saco_cultivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidade_monitoramento" (
    "id" SERIAL NOT NULL,
    "saco_cultivo_id" INTEGER NOT NULL,
    "codigo_serie" TEXT NOT NULL,
    "microaspersor_ativo" BOOLEAN NOT NULL,
    "sensor_ativo" BOOLEAN NOT NULL,
    "ultima_manutencao" TIMESTAMP(3) NOT NULL,
    "vazao_media" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "unidade_monitoramento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leitura_sensor" (
    "id" SERIAL NOT NULL,
    "unidade_monitoramento_id" INTEGER NOT NULL,
    "area_cultivo_id" INTEGER NOT NULL,
    "umidade_substrato" DOUBLE PRECISION NOT NULL,
    "umidade_ambiente" DOUBLE PRECISION NOT NULL,
    "temperatura" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leitura_sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evento_irrigacao" (
    "id" SERIAL NOT NULL,
    "area_cultivo_id" INTEGER NOT NULL,
    "unidade_monitoramento_id" INTEGER NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3) NOT NULL,
    "tipo" "TipoIrrigacao" NOT NULL,
    "volume_agua" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "evento_irrigacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lote" (
    "id" SERIAL NOT NULL,
    "area_cultivo_id" INTEGER NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,

    CONSTRAINT "lote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registro_producao" (
    "id" SERIAL NOT NULL,
    "lote_id" INTEGER NOT NULL,
    "data" DATE NOT NULL,
    "quantidade_kg" DOUBLE PRECISION NOT NULL,
    "qualidade" "Qualidade" NOT NULL,
    "problemas_encontrados" JSONB NOT NULL,
    "observacoes" TEXT NOT NULL,

    CONSTRAINT "registro_producao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alerta" (
    "id" SERIAL NOT NULL,
    "area_cultivo_id" INTEGER NOT NULL,
    "unidade_monitoramento_id" INTEGER,
    "tipo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusAlerta" NOT NULL,

    CONSTRAINT "alerta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unidade_monitoramento_saco_cultivo_id_key" ON "unidade_monitoramento"("saco_cultivo_id");

-- AddForeignKey
ALTER TABLE "configuracoes_notificacao" ADD CONSTRAINT "configuracoes_notificacao_produtor_id_fkey" FOREIGN KEY ("produtor_id") REFERENCES "produtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area_cultivo" ADD CONSTRAINT "area_cultivo_produtor_id_fkey" FOREIGN KEY ("produtor_id") REFERENCES "produtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saco_cultivo" ADD CONSTRAINT "saco_cultivo_area_cultivo_id_fkey" FOREIGN KEY ("area_cultivo_id") REFERENCES "area_cultivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidade_monitoramento" ADD CONSTRAINT "unidade_monitoramento_saco_cultivo_id_fkey" FOREIGN KEY ("saco_cultivo_id") REFERENCES "saco_cultivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leitura_sensor" ADD CONSTRAINT "leitura_sensor_unidade_monitoramento_id_fkey" FOREIGN KEY ("unidade_monitoramento_id") REFERENCES "unidade_monitoramento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leitura_sensor" ADD CONSTRAINT "leitura_sensor_area_cultivo_id_fkey" FOREIGN KEY ("area_cultivo_id") REFERENCES "area_cultivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento_irrigacao" ADD CONSTRAINT "evento_irrigacao_area_cultivo_id_fkey" FOREIGN KEY ("area_cultivo_id") REFERENCES "area_cultivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento_irrigacao" ADD CONSTRAINT "evento_irrigacao_unidade_monitoramento_id_fkey" FOREIGN KEY ("unidade_monitoramento_id") REFERENCES "unidade_monitoramento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lote" ADD CONSTRAINT "lote_area_cultivo_id_fkey" FOREIGN KEY ("area_cultivo_id") REFERENCES "area_cultivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registro_producao" ADD CONSTRAINT "registro_producao_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "lote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerta" ADD CONSTRAINT "alerta_area_cultivo_id_fkey" FOREIGN KEY ("area_cultivo_id") REFERENCES "area_cultivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerta" ADD CONSTRAINT "alerta_unidade_monitoramento_id_fkey" FOREIGN KEY ("unidade_monitoramento_id") REFERENCES "unidade_monitoramento"("id") ON DELETE SET NULL ON UPDATE CASCADE;
