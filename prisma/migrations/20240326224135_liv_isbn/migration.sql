/*
  Warnings:

  - A unique constraint covering the columns `[liv_ISBN]` on the table `Livro` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `liv_ISBN` to the `Livro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Livro" ADD COLUMN     "liv_ISBN" CHAR(13) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Livro_liv_ISBN_key" ON "Livro"("liv_ISBN");
