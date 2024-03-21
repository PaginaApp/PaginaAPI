/*
  Warnings:

  - You are about to alter the column `usu_CEP` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Char(16)` to `Char(9)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "usu_CEP" SET DATA TYPE CHAR(9);
