/*
  Warnings:

  - Added the required column `liv_AtualizadoEm` to the `Livro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Livro" ADD COLUMN     "liv_AtualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "liv_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
