/*
  Warnings:

  - You are about to drop the column `no` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `yes` on the `Bid` table. All the data in the column will be lost.
  - Added the required column `noCount` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yesCount` to the `Bid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "no",
DROP COLUMN "yes",
ADD COLUMN     "noCount" INTEGER NOT NULL,
ADD COLUMN     "yesCount" INTEGER NOT NULL;
