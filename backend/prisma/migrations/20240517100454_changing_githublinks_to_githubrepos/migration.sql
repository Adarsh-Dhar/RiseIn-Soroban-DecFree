/*
  Warnings:

  - You are about to drop the column `github` on the `Freelancer` table. All the data in the column will be lost.
  - Added the required column `repo1` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repo2` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repo3` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repo4` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repo5` to the `Bid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bid" ADD COLUMN     "repo1" TEXT NOT NULL,
ADD COLUMN     "repo2" TEXT NOT NULL,
ADD COLUMN     "repo3" TEXT NOT NULL,
ADD COLUMN     "repo4" TEXT NOT NULL,
ADD COLUMN     "repo5" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Freelancer" DROP COLUMN "github";
