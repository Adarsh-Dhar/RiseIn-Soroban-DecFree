/*
  Warnings:

  - You are about to drop the column `project_id` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `worker_id` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `SubmissionCache` table. All the data in the column will be lost.
  - You are about to drop the column `balance_id` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the column `locked_amount` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the column `pending_amount` on the `Worker` table. All the data in the column will be lost.
  - Added the required column `freelancerId` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workerId` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `SubmissionCache` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balanceid` to the `Worker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lockedAmount` to the `Worker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendingAmount` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_worker_id_fkey";

-- DropForeignKey
ALTER TABLE "SubmissionCache" DROP CONSTRAINT "SubmissionCache_project_id_fkey";

-- AlterTable
ALTER TABLE "Bid" ADD COLUMN     "freelancerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "project_id",
DROP COLUMN "worker_id",
ADD COLUMN     "projectId" INTEGER NOT NULL,
ADD COLUMN     "workerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SubmissionCache" DROP COLUMN "project_id",
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Worker" DROP COLUMN "balance_id",
DROP COLUMN "locked_amount",
DROP COLUMN "pending_amount",
ADD COLUMN     "balanceid" INTEGER NOT NULL,
ADD COLUMN     "lockedAmount" INTEGER NOT NULL,
ADD COLUMN     "pendingAmount" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionCache" ADD CONSTRAINT "SubmissionCache_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
