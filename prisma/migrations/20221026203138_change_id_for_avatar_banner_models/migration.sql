-- DropForeignKey
ALTER TABLE "acc_avatars" DROP CONSTRAINT "acc_avatars_profileId_fkey";

-- DropForeignKey
ALTER TABLE "acc_banners" DROP CONSTRAINT "acc_banners_profileId_fkey";

-- AddForeignKey
ALTER TABLE "acc_avatars" ADD CONSTRAINT "acc_avatars_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "acc_profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acc_banners" ADD CONSTRAINT "acc_banners_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "acc_profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
