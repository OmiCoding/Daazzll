/*
  Warnings:

  - Added the required column `type` to the `acc_avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `acc_banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "acc_avatar" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "acc_banner" ADD COLUMN     "type" TEXT NOT NULL;
