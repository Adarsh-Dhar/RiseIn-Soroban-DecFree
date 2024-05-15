/*
  Warnings:

  - You are about to drop the column `projectId` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `github` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bidId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_projectId_fkey";

-- AlterTable
ALTER TABLE "Bid" ADD COLUMN     "github" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "projectId",
ADD COLUMN     "bidId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_bidId_fkey" FOREIGN KEY ("bidId") REFERENCES "Bid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
