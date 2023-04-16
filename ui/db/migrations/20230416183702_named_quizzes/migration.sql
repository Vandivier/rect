/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_name_key" ON "Quiz"("name");
