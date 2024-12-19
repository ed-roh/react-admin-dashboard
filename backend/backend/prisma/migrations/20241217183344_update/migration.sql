/*
  Warnings:

  - You are about to drop the column `temperatura` on the `leitura_sensor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "area_cultivo" ADD COLUMN     "co2_ar" DOUBLE PRECISION,
ADD COLUMN     "nutrientes_agua" DOUBLE PRECISION,
ADD COLUMN     "ph_agua" DOUBLE PRECISION,
ADD COLUMN     "temperatura" DOUBLE PRECISION,
ADD COLUMN     "umidade_ar" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "leitura_sensor" DROP COLUMN "temperatura";
