/*
  Warnings:

  - Added the required column `count` to the `designs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "designs" ADD COLUMN     "count" INTEGER NOT NULL;
