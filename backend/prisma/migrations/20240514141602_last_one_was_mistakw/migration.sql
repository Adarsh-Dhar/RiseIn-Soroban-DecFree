/*
  Warnings:

  - You are about to drop the `GithubLink` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `github` to the `Freelancer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GithubLink" DROP CONSTRAINT "GithubLink_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "GithubLink" DROP CONSTRAINT "GithubLink_projectId_fkey";

-- AlterTable
ALTER TABLE "Freelancer" ADD COLUMN     "github" TEXT NOT NULL;

-- DropTable
DROP TABLE "GithubLink";
