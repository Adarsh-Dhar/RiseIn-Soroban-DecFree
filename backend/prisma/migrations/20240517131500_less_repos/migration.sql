/*
  Warnings:

  - You are about to drop the column `repo4` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `repo5` on the `Bid` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "repo4",
DROP COLUMN "repo5";
