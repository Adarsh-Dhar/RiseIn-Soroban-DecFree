/*
  Warnings:

  - You are about to drop the column `deadline` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `repo1` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `repo2` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `repo3` on the `Bid` table. All the data in the column will be lost.
  - Added the required column `repo` to the `Bid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "deadline",
DROP COLUMN "price",
DROP COLUMN "repo1",
DROP COLUMN "repo2",
DROP COLUMN "repo3",
ADD COLUMN     "repo" TEXT NOT NULL;
