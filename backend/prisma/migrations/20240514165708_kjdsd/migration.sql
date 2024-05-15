/*
  Warnings:

  - Changed the type of `Deadline` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "Deadline",
ADD COLUMN     "Deadline" INTEGER NOT NULL;
