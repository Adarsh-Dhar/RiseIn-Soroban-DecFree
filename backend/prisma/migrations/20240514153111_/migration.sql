/*
  Warnings:

  - A unique constraint covering the columns `[workerId,bidId]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Submission_workerId_bidId_key" ON "Submission"("workerId", "bidId");
