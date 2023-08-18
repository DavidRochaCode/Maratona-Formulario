/*
  Warnings:

  - You are about to drop the column `cursoProgramacao` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "cursoProgramacao";

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "participanteNome" TEXT NOT NULL,
    "participanteEmail" TEXT NOT NULL,
    "participanteCelular" TEXT NOT NULL,
    "cursoEscollhido" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);
