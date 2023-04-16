/*
  Warnings:

  - A unique constraint covering the columns `[inputId]` on the table `CurriculumUnit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inputId]` on the table `PossibleAnswer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inputId]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inputId]` on the table `QuizItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inputId` to the `CurriculumUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inputId` to the `PossibleAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inputId` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inputId` to the `QuizItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CurriculumUnit" ADD COLUMN     "inputId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PossibleAnswer" ADD COLUMN     "inputId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "inputId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuizItem" ADD COLUMN     "inputId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumUnit_inputId_key" ON "CurriculumUnit"("inputId");

-- CreateIndex
CREATE UNIQUE INDEX "PossibleAnswer_inputId_key" ON "PossibleAnswer"("inputId");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_inputId_key" ON "Quiz"("inputId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizItem_inputId_key" ON "QuizItem"("inputId");
