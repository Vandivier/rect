import { resolver } from "@blitzjs/rpc"
import db from "db"

export interface GetPassedQuizNamesInput {
  userId: number
}

export const getPassedQuizNames = resolver.pipe(async ({ userId }: GetPassedQuizNamesInput) => {
  const passedQuizResults = await db.quizResult.findMany({
    where: {
      userId,
      passed: true,
    },
    select: {
      quiz: {
        select: {
          name: true,
        },
      },
    },
  })

  const quizNames = passedQuizResults.map((result) => result.quiz.name)
  return quizNames
})

export default getPassedQuizNames
