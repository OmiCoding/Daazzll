/*
  Warnings:

  - Changed the type of `version` on the `acc_avatars` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `version` on the `acc_banners` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "acc_avatars" DROP COLUMN "version",
ADD COLUMN     "version" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "acc_banners" DROP COLUMN "version",
ADD COLUMN     "version" INTEGER NOT NULL;
