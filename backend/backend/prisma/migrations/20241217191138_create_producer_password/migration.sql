/*
  Warnings:

  - Added the required column `senha` to the `produtor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtor" ADD COLUMN     "senha" TEXT NOT NULL;
