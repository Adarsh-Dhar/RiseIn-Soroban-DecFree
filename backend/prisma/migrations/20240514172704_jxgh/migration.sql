/*
  Warnings:

  - You are about to drop the column `github` on the `Bid` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "github",
ALTER COLUMN "accepted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "assigned" SET DEFAULT false;
