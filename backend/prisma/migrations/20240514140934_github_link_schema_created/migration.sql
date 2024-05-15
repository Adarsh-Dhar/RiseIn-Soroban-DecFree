-- CreateTable
CREATE TABLE "GithubLink" (
    "id" SERIAL NOT NULL,
    "githubLink" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "freelancerId" INTEGER NOT NULL,

    CONSTRAINT "GithubLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GithubLink" ADD CONSTRAINT "GithubLink_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GithubLink" ADD CONSTRAINT "GithubLink_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
