/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `produtor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "produtor_email_key" ON "produtor"("email");
