/*
  Warnings:

  - You are about to alter the column `name` on the `Pokemon` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - A unique constraint covering the columns `[name]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Pokemon" ALTER COLUMN "name" SET DATA TYPE VARCHAR(25);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");
