/*
  Warnings:

  - Added the required column `castrated` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "castrated" BOOLEAN NOT NULL;
