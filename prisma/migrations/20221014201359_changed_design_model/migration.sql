/*
  Warnings:

  - You are about to drop the column `image` on the `designs` table. All the data in the column will be lost.
  - Added the required column `folder` to the `designs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `designs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `designs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "designs" DROP COLUMN "image",
ADD COLUMN     "folder" TEXT NOT NULL,
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
