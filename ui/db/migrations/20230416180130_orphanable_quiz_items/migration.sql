-- DropForeignKey
ALTER TABLE "QuizItem" DROP CONSTRAINT "QuizItem_correctAnswerId_fkey";

-- AlterTable
ALTER TABLE "QuizItem" ALTER COLUMN "correctAnswerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "QuizItem" ADD CONSTRAINT "QuizItem_correctAnswerId_fkey" FOREIGN KEY ("correctAnswerId") REFERENCES "PossibleAnswer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
