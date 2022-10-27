/*
  Warnings:

  - Added the required column `version` to the `acc_avatars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `acc_banners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "acc_avatars" ADD COLUMN     "version" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "acc_banners" ADD COLUMN     "version" TEXT NOT NULL;
