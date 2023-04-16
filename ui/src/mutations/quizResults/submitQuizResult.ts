// app/mutations/quizResults/submitQuizResult.ts
import { Ctx } from "@blitzjs/next"
import { resolver } from "@blitzjs/rpc"
import { AuthorizationError } from "blitz"
import db from "db"
import { z } from "zod"

const SubmitQuizResult = z.object({
  quizId: z.number(),
  selectedAnswerIds: z.record(z.string()),
})

export default resolver.pipe(
  resolver.zod(SubmitQuizResult),
  resolver.authorize(),
  async ({ quizId, selectedAnswerIds }, ctx: Ctx) => {
    const userId = await ctx.session.userId

    if (userId === null) throw new AuthorizationError("User not logged in")

    const quizItems = await db.quizItem.findMany({
      where: { quizId },
      include: { correctAnswer: true },
    })

    const correctAnswerCount = quizItems.reduce((count, quizItem) => {
      const selectedAnswerId = selectedAnswerIds[quizItem.id.toString()]

      if (!quizItem.correctAnswer)
        throw new Error(`Super mean quiz item!! with inputId: ${quizItem.inputId}`)

      return count + (quizItem.correctAnswer.inputId === selectedAnswerId ? 1 : 0)
    }, 0)

    const score = (correctAnswerCount / quizItems.length) * 100
    const passed = score >= 70 // Adjust this threshold based on your passing criteria

    const quizResult = await db.quizResult.create({
      data: {
        passed,
        score,
        quiz: { connect: { id: quizId } },
        user: { connect: { id: userId } },
      },
      select: {
        passed: true,
        score: true,
      },
    })

    return quizResult
  }
)
