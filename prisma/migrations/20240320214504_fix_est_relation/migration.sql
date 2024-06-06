/*
  Warnings:

  - You are about to drop the column `usu_est_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `cid_est_id` to the `Cidade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_usu_est_id_fkey";

-- AlterTable
ALTER TABLE "Cidade" ADD COLUMN     "cid_est_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "usu_est_id";

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_cid_est_id_fkey" FOREIGN KEY ("cid_est_id") REFERENCES "Estado"("est_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
