// ref: https://www.prisma.io/docs/guides/migrate/seed-database
import db, { Prisma, Quiz, QuizItem } from "./index"
import quizzes from "../../be/transcript_service/outputs/quizzes.json"

const seed = async () => {
  // Seed quizzes
  await Promise.all(
    quizzes.map(async (quizData) => {
      const { quiz: quizInputData, quizItems, possibleAnswers } = quizData

      const quiz: Quiz = await db.quiz.create({
        data: {
          inputId: quizInputData.inputId,
          name: quizInputData.name,
          sourcePlatformId: quizInputData.sourcePlatformId,
          sourcePlatformName: quizInputData.sourcePlatformName,
        },
      })

      // Seed quiz items
      const quizItemMap = new Map<string, QuizItem>()
      await Promise.all(
        quizItems.map(async (quizItemData) => {
          const { inputId, questionText, possibleAnswerInputIds } = quizItemData

          const quizItemCreateInput: Prisma.QuizItemCreateInput = {
            inputId,
            questionText,
            quiz: { connect: { id: quiz.id } },
          }
          const quizItem = await db.quizItem.create({
            data: quizItemCreateInput,
          })

          quizItemMap.set(quizItemData.inputId, quizItem)

          // Seed possible answers
          await Promise.all(
            possibleAnswerInputIds.map(async (possibleAnswerId) => {
              const possibleAnswerData = possibleAnswers.find(
                (pa) => pa.inputId === possibleAnswerId
              )

              if (possibleAnswerData) {
                await db.possibleAnswer.create({
                  data: {
                    inputId: possibleAnswerData.inputId,
                    text: possibleAnswerData.text,
                    quizItem: { connect: { id: quizItem.id } },
                  },
                })
              }
            })
          )
        })
      )

      // Connect quiz items with correct answers and possible answers
      await Promise.all(
        quizItems.map(async (quizItemData) => {
          const quizItem = quizItemMap.get(quizItemData.inputId)

          if (quizItem) {
            const correctAnswer = await db.possibleAnswer.findUniqueOrThrow({
              where: { inputId: quizItemData.correctAnswerId },
            })
            const possibleAnswerIds = quizItemData.possibleAnswerInputIds

            if (correctAnswer && possibleAnswerIds.includes(correctAnswer.inputId)) {
              const possibleAnswersToConnect: Prisma.Enumerable<Prisma.PossibleAnswerWhereUniqueInput> =
                possibleAnswerIds.map((inputId) => ({ inputId }))

              await db.quizItem.update({
                where: { id: quizItem.id },
                data: {
                  correctAnswer: { connect: { id: correctAnswer.id } },
                  possibleAnswers: { connect: possibleAnswersToConnect },
                },
              })
            } else {
              console.log({ quizItem, correctAnswer, possibleAnswerIds })
              throw new Error(`Super mean quiz item!! with inputId: ${quizItem.inputId}`)
            }
          }
        })
      )
    })
  )
}

export default seed
