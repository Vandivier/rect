import { useMutation, useQuery } from "@blitzjs/rpc"
import { PossibleAnswer } from "@prisma/client"
import React from "react"
import { Field, Form } from "react-final-form"
import getQuizByName from "src/queries/quizzes/getQuizByName"
import submitQuizResult from "src/mutations/quizResults/submitQuizResult"

type QuizFormValues = {
  selectedAnswerIds: {
    [key: string]: string
  }
}

type QuizProps = {
  quizName: string
}

const Quiz: React.FC<QuizProps> = ({ quizName }) => {
  const [quiz] = useQuery(getQuizByName, { name: quizName })
  const [submitQuizResultMutation] = useMutation(submitQuizResult)
  const [result, setResult] = React.useState<{ passed: boolean; score: number } | null>(null)

  const onSubmit = async (values: QuizFormValues) => {
    try {
      const selectedAnswerIds = Object.fromEntries(
        Object.entries(values.selectedAnswerIds).map(([key, value]) => [parseInt(key), value])
      )

      const result = await submitQuizResultMutation({
        quizId: quiz.id,
        selectedAnswerIds,
      })
      setResult(result)
    } catch (error) {
      console.error("Failed to submit quiz result:", error)
    }
  }

  if (!quiz) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>{quiz?.name}</h2>
      {result === null ? (
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {quiz.quizItems.map((quizItem) => (
                <div key={quizItem.id}>
                  <h3>{quizItem.questionText}</h3>
                  {quizItem.possibleAnswers.map((possibleAnswer: PossibleAnswer) => (
                    <div key={possibleAnswer.id}>
                      <Field
                        name={`selectedAnswerIds[${quizItem.id}]`}
                        component="input"
                        type="radio"
                        value={possibleAnswer.inputId}
                      />
                      {possibleAnswer.text}
                    </div>
                  ))}
                </div>
              ))}
              <button type="submit">Submit</button>
            </form>
          )}
        />
      ) : (
        <div style={{ fontSize: "1.5rem", color: result.passed ? "green" : "red" }}>
          {result.passed ? (
            <>
              🎉 Congratulations! 🎉
              <p>You passed the quiz with a score of {result.score}%!</p>
            </>
          ) : (
            <>
              😢 Better luck next time. 😢
              <p>
                Keep going and get smarter, and you'll do better next time! Your score was{" "}
                {result.score}%.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Quiz
