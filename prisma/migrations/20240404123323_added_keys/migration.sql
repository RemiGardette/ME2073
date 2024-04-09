/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_userId_fkey";

-- AlterTable
ALTER TABLE "Reviews" ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "courseId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE SET NULL ON UPDATE CASCADE;
