/*
  Warnings:

  - You are about to drop the column `image` on the `acc_avatars` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `acc_banners` table. All the data in the column will be lost.
  - Added the required column `folder` to the `acc_avatars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `acc_avatars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `acc_avatars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `folder` to the `acc_banners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `acc_banners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `acc_banners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "acc_avatars" DROP COLUMN "image",
ADD COLUMN     "folder" TEXT NOT NULL,
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "acc_banners" DROP COLUMN "image",
ADD COLUMN     "folder" TEXT NOT NULL,
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
