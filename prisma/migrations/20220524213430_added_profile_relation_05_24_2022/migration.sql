-- CreateTable
CREATE TABLE "acc_profiles" (
    "userId" INTEGER NOT NULL,
    "website" TEXT,
    "discord" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,

    CONSTRAINT "acc_profiles_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "acc_profiles" ADD CONSTRAINT "acc_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
