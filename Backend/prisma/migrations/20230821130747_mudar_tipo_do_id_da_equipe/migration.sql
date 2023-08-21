/*
  Warnings:

  - The primary key for the `Equipe` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_equipeId_fkey";

-- AlterTable
ALTER TABLE "Equipe" DROP CONSTRAINT "Equipe_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Equipe_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "equipeId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "Equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
