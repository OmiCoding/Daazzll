/*
  Warnings:

  - You are about to drop the column `discord` on the `acc_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `facebook` on the `acc_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `acc_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `acc_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `acc_profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "acc_profiles" DROP COLUMN "discord",
DROP COLUMN "facebook",
DROP COLUMN "instagram",
DROP COLUMN "twitter",
DROP COLUMN "website";

-- CreateTable
CREATE TABLE "acc_socials" (
    "id" INTEGER NOT NULL,
    "webstite" TEXT,
    "discord" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "profileId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "acc_socials_profileId_key" ON "acc_socials"("profileId");

-- AddForeignKey
ALTER TABLE "acc_socials" ADD CONSTRAINT "acc_socials_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "acc_profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
