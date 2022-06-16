-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fName" VARCHAR(255) NOT NULL,
    "lName" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pass" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "role" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnalytics" (
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserAnalytics_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "userId" INTEGER NOT NULL,
    "theme" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel_Vote" (
    "id" SERIAL NOT NULL,
    "like" BOOLEAN NOT NULL DEFAULT false,
    "dislike" BOOLEAN NOT NULL DEFAULT false,
    "channelId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Channel_Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "channelId" INTEGER NOT NULL,
    "video" TEXT,
    "postText" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post_Vote" (
    "id" SERIAL NOT NULL,
    "like" BOOLEAN NOT NULL DEFAULT false,
    "dislike" BOOLEAN NOT NULL DEFAULT false,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Post_Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Short" (
    "id" SERIAL NOT NULL,
    "video" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Short_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Short_Vote" (
    "id" SERIAL NOT NULL,
    "like" BOOLEAN NOT NULL DEFAULT false,
    "dislike" BOOLEAN NOT NULL DEFAULT false,
    "shortId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Short_Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_username_key" ON "User"("email", "username");

-- AddForeignKey
ALTER TABLE "UserAnalytics" ADD CONSTRAINT "UserAnalytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel_Vote" ADD CONSTRAINT "Channel_Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserAnalytics"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel_Vote" ADD CONSTRAINT "Channel_Vote_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Vote" ADD CONSTRAINT "Post_Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserAnalytics"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Vote" ADD CONSTRAINT "Post_Vote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Short_Vote" ADD CONSTRAINT "Short_Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserAnalytics"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Short_Vote" ADD CONSTRAINT "Short_Vote_shortId_fkey" FOREIGN KEY ("shortId") REFERENCES "Short"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
