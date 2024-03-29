-- CreateTable
CREATE TABLE "CourseEvals" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "link" TEXT NOT NULL,
    "reviewsId" INTEGER,

    CONSTRAINT "CourseEvals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseEvals" ADD CONSTRAINT "CourseEvals_reviewsId_fkey" FOREIGN KEY ("reviewsId") REFERENCES "Reviews"("id") ON DELETE SET NULL ON UPDATE CASCADE;
