-- CreateTable
CREATE TABLE "acc_pictures" (
    "userId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "ext" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "acc_pictures_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "designs" (
    "userId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "ext" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "designs_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "acc_pictures" ADD CONSTRAINT "acc_pictures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "acc_profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "designs" ADD CONSTRAINT "designs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
