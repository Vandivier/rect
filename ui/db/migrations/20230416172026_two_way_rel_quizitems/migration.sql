/*
  Warnings:

  - Made the column `quizId` on table `QuizItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "QuizItem" DROP CONSTRAINT "QuizItem_quizId_fkey";

-- AlterTable
ALTER TABLE "QuizItem" ALTER COLUMN "quizId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "QuizItem" ADD CONSTRAINT "QuizItem_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
