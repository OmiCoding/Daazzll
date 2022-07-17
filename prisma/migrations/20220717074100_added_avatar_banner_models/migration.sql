/*
  Warnings:

  - You are about to drop the `acc_pictures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "acc_pictures" DROP CONSTRAINT "acc_pictures_userId_fkey";

-- DropTable
DROP TABLE "acc_pictures";

-- CreateTable
CREATE TABLE "acc_avatar" (
    "userId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "ext" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "acc_avatar_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "acc_banner" (
    "userId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "ext" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "acc_banner_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "acc_avatar" ADD CONSTRAINT "acc_avatar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "acc_profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acc_banner" ADD CONSTRAINT "acc_banner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "acc_profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
