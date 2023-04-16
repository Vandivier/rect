-- AlterTable
ALTER TABLE "FlashCard" ADD COLUMN     "flashCardDeckId" INTEGER;

-- CreateTable
CREATE TABLE "PossibleAnswer" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "quizItemId" INTEGER NOT NULL,
    "correctAnswerForId" INTEGER,

    CONSTRAINT "PossibleAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizItem" (
    "id" SERIAL NOT NULL,
    "questionText" TEXT NOT NULL,
    "correctAnswerId" INTEGER NOT NULL,
    "quizId" INTEGER,

    CONSTRAINT "QuizItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "sourcePlatformId" TEXT NOT NULL,
    "sourcePlatformName" TEXT NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurriculumUnit" (
    "id" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,
    "flashCardDeckId" INTEGER NOT NULL,

    CONSTRAINT "CurriculumUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlashCardDeck" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "FlashCardDeck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizResult" (
    "id" SERIAL NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "quizId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "QuizResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuizItem_correctAnswerId_key" ON "QuizItem"("correctAnswerId");

-- AddForeignKey
ALTER TABLE "FlashCard" ADD CONSTRAINT "FlashCard_flashCardDeckId_fkey" FOREIGN KEY ("flashCardDeckId") REFERENCES "FlashCardDeck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PossibleAnswer" ADD CONSTRAINT "PossibleAnswer_quizItemId_fkey" FOREIGN KEY ("quizItemId") REFERENCES "QuizItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizItem" ADD CONSTRAINT "QuizItem_correctAnswerId_fkey" FOREIGN KEY ("correctAnswerId") REFERENCES "PossibleAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizItem" ADD CONSTRAINT "QuizItem_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumUnit" ADD CONSTRAINT "CurriculumUnit_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumUnit" ADD CONSTRAINT "CurriculumUnit_flashCardDeckId_fkey" FOREIGN KEY ("flashCardDeckId") REFERENCES "FlashCardDeck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
