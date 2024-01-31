-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_usu_cid_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_usu_est_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "usu_avatar" DROP NOT NULL,
ALTER COLUMN "usu_Rua" DROP NOT NULL,
ALTER COLUMN "usu_Numero" DROP NOT NULL,
ALTER COLUMN "usu_Bairro" DROP NOT NULL,
ALTER COLUMN "usu_CEP" DROP NOT NULL,
ALTER COLUMN "usu_Complemento" DROP NOT NULL,
ALTER COLUMN "usu_est_id" DROP NOT NULL,
ALTER COLUMN "usu_cid_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_usu_est_id_fkey" FOREIGN KEY ("usu_est_id") REFERENCES "Estado"("est_Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_usu_cid_id_fkey" FOREIGN KEY ("usu_cid_id") REFERENCES "Cidade"("cid_Id") ON DELETE SET NULL ON UPDATE CASCADE;
