/*
  Warnings:

  - You are about to drop the column `signatur` on the `Payouts` table. All the data in the column will be lost.
  - Added the required column `signature` to the `Payouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payouts" DROP COLUMN "signatur",
ADD COLUMN     "signature" TEXT NOT NULL;
