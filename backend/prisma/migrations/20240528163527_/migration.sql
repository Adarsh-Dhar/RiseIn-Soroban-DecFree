/*
  Warnings:

  - You are about to drop the column `lockedAmount` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the column `pendingAmount` on the `Worker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Worker" DROP COLUMN "lockedAmount",
DROP COLUMN "pendingAmount";
