/*
  Warnings:

  - You are about to drop the column `qualidade` on the `registro_producao` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade_kg` on the `registro_producao` table. All the data in the column will be lost.
  - Added the required column `quantidade_tipo_a_kg` to the `registro_producao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade_tipo_b_kg` to the `registro_producao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade_tipo_c_kg` to the `registro_producao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registro_producao" DROP COLUMN "qualidade",
DROP COLUMN "quantidade_kg",
ADD COLUMN     "quantidade_tipo_a_kg" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantidade_tipo_b_kg" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantidade_tipo_c_kg" DOUBLE PRECISION NOT NULL;

-- DropEnum
DROP TYPE "Qualidade";
