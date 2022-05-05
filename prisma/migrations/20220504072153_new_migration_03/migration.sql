/*
  Warnings:

  - You are about to drop the `Channel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Channel_Vote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_Vote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Short` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Short_Vote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAnalytics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_userId_fkey";

-- DropForeignKey
ALTER TABLE "Channel_Vote" DROP CONSTRAINT "Channel_Vote_channelId_fkey";

-- DropForeignKey
ALTER TABLE "Channel_Vote" DROP CONSTRAINT "Channel_Vote_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_channelId_fkey";

-- DropForeignKey
ALTER TABLE "Post_Vote" DROP CONSTRAINT "Post_Vote_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post_Vote" DROP CONSTRAINT "Post_Vote_userId_fkey";

-- DropForeignKey
ALTER TABLE "Short_Vote" DROP CONSTRAINT "Short_Vote_shortId_fkey";

-- DropForeignKey
ALTER TABLE "Short_Vote" DROP CONSTRAINT "Short_Vote_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserAnalytics" DROP CONSTRAINT "UserAnalytics_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_userId_fkey";

-- DropTable
DROP TABLE "Channel";

-- DropTable
DROP TABLE "Channel_Vote";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Post_Vote";

-- DropTable
DROP TABLE "Short";

-- DropTable
DROP TABLE "Short_Vote";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserAnalytics";

-- DropTable
DROP TABLE "UserSettings";

-- CreateTable
CREATE TABLE "accounts" (
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

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acc_analytics" (
    "userId" INTEGER NOT NULL,

    CONSTRAINT "acc_analytics_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "acc_settings" (
    "userId" INTEGER NOT NULL,
    "theme" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "acc_settings_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "channels" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channel_votes" (
    "id" SERIAL NOT NULL,
    "like" BOOLEAN NOT NULL DEFAULT false,
    "dislike" BOOLEAN NOT NULL DEFAULT false,
    "channelId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "channel_votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "channelId" INTEGER NOT NULL,
    "video" TEXT,
    "postText" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_votes" (
    "id" SERIAL NOT NULL,
    "like" BOOLEAN NOT NULL DEFAULT false,
    "dislike" BOOLEAN NOT NULL DEFAULT false,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "post_votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shorts" (
    "id" SERIAL NOT NULL,
    "video" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shorts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "short_votes" (
    "id" SERIAL NOT NULL,
    "like" BOOLEAN NOT NULL DEFAULT false,
    "dislike" BOOLEAN NOT NULL DEFAULT false,
    "shortId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "short_votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_username_key" ON "accounts"("email", "username");

-- AddForeignKey
ALTER TABLE "acc_analytics" ADD CONSTRAINT "acc_analytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acc_settings" ADD CONSTRAINT "acc_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel_votes" ADD CONSTRAINT "channel_votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "acc_analytics"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel_votes" ADD CONSTRAINT "channel_votes_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_votes" ADD CONSTRAINT "post_votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "acc_analytics"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_votes" ADD CONSTRAINT "post_votes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "short_votes" ADD CONSTRAINT "short_votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "acc_analytics"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "short_votes" ADD CONSTRAINT "short_votes_shortId_fkey" FOREIGN KEY ("shortId") REFERENCES "shorts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
