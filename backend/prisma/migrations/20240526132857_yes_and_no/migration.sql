/*
  Warnings:

  - You are about to drop the column `maxVote` on the `Bid` table. All the data in the column will be lost.
  - Added the required column `no` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yes` to the `Bid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "maxVote",
ADD COLUMN     "no" INTEGER NOT NULL,
ADD COLUMN     "yes" INTEGER NOT NULL;
