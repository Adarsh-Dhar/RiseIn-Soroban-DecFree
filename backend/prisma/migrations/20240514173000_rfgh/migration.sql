/*
  Warnings:

  - Changed the type of `deadline` on the `Bid` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "deadline",
ADD COLUMN     "deadline" INTEGER NOT NULL;
