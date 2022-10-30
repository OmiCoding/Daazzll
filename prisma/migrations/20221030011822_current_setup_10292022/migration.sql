/*
  Warnings:

  - You are about to drop the column `webstite` on the `acc_socials` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "acc_socials" DROP COLUMN "webstite",
ADD COLUMN     "website" TEXT;
