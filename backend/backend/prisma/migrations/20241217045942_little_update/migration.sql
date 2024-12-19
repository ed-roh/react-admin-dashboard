/*
  Warnings:

  - Made the column `unidade_monitoramento_id` on table `alerta` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "alerta" DROP CONSTRAINT "alerta_unidade_monitoramento_id_fkey";

-- AlterTable
ALTER TABLE "alerta" ALTER COLUMN "unidade_monitoramento_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "area_cultivo" ALTER COLUMN "umidade_min" DROP NOT NULL,
ALTER COLUMN "umidade_max" DROP NOT NULL,
ALTER COLUMN "tempo_irrigacao_padrao" DROP NOT NULL,
ALTER COLUMN "horarios_permitidos" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "alerta" ADD CONSTRAINT "alerta_unidade_monitoramento_id_fkey" FOREIGN KEY ("unidade_monitoramento_id") REFERENCES "unidade_monitoramento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
