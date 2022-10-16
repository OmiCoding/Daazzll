/*
  Warnings:

  - You are about to drop the column `userId` on the `acc_avatars` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `acc_banners` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `acc_avatars` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `acc_banners` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `acc_avatars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `acc_banners` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "acc_avatars" DROP CONSTRAINT "acc_avatars_userId_fkey";

-- DropForeignKey
ALTER TABLE "acc_banners" DROP CONSTRAINT "acc_banners_userId_fkey";

-- DropIndex
DROP INDEX "acc_avatars_userId_key";

-- DropIndex
DROP INDEX "acc_banners_userId_key";

-- AlterTable
ALTER TABLE "acc_avatars" DROP COLUMN "userId",
ADD COLUMN     "profileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "acc_banners" DROP COLUMN "userId",
ADD COLUMN     "profileId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "acc_avatars_profileId_key" ON "acc_avatars"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "acc_banners_profileId_key" ON "acc_banners"("profileId");

-- AddForeignKey
ALTER TABLE "acc_avatars" ADD CONSTRAINT "acc_avatars_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "acc_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acc_banners" ADD CONSTRAINT "acc_banners_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "acc_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
