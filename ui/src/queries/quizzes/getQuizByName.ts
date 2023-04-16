import { Ctx } from "blitz"
import db from "db"

type GetQuizByNameInput = {
  name: string
}

export default async function getQuizByName({ name }: GetQuizByNameInput, ctx: Ctx) {
  ctx.session.$authorize()

  const quiz = await db.quiz.findUnique({
    where: { name },
    include: { quizItems: { include: { possibleAnswers: true } } },
  })

  if (!quiz) throw new Error("Quiz not found")

  return quiz
}
