/*
  Warnings:

  - You are about to drop the `channel_votes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `channels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_votes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `short_votes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shorts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "channel_votes" DROP CONSTRAINT "channel_votes_channelId_fkey";

-- DropForeignKey
ALTER TABLE "channel_votes" DROP CONSTRAINT "channel_votes_userId_fkey";

-- DropForeignKey
ALTER TABLE "channels" DROP CONSTRAINT "channels_userId_fkey";

-- DropForeignKey
ALTER TABLE "post_votes" DROP CONSTRAINT "post_votes_postId_fkey";

-- DropForeignKey
ALTER TABLE "post_votes" DROP CONSTRAINT "post_votes_userId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_channelId_fkey";

-- DropForeignKey
ALTER TABLE "short_votes" DROP CONSTRAINT "short_votes_shortId_fkey";

-- DropForeignKey
ALTER TABLE "short_votes" DROP CONSTRAINT "short_votes_userId_fkey";

-- DropTable
DROP TABLE "channel_votes";

-- DropTable
DROP TABLE "channels";

-- DropTable
DROP TABLE "post_votes";

-- DropTable
DROP TABLE "posts";

-- DropTable
DROP TABLE "short_votes";

-- DropTable
DROP TABLE "shorts";
