/*
  Warnings:

  - The primary key for the `acc_profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `designs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `acc_avatar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `acc_banner` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `acc_profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `designs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "acc_avatar" DROP CONSTRAINT "acc_avatar_userId_fkey";

-- DropForeignKey
ALTER TABLE "acc_banner" DROP CONSTRAINT "acc_banner_userId_fkey";

-- AlterTable
ALTER TABLE "acc_profiles" DROP CONSTRAINT "acc_profiles_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "acc_profiles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "designs" DROP CONSTRAINT "designs_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "designs_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "acc_avatar";

-- DropTable
DROP TABLE "acc_banner";

-- CreateTable
CREATE TABLE "acc_avatars" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "ext" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "acc_avatars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acc_banners" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "ext" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "acc_banners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "acc_avatars_userId_key" ON "acc_avatars"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "acc_banners_userId_key" ON "acc_banners"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "acc_profiles_userId_key" ON "acc_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "designs_userId_key" ON "designs"("userId");

-- AddForeignKey
ALTER TABLE "acc_avatars" ADD CONSTRAINT "acc_avatars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "acc_profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acc_banners" ADD CONSTRAINT "acc_banners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "acc_profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
