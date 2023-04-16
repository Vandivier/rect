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

  const onSubmit = async (values: QuizFormValues) => {
    try {
      const result = await submitQuizResultMutation({
        quizId: quiz.id,
        selectedAnswerIds: Object.fromEntries(
          Object.entries(values.selectedAnswerIds).map(([key, value]) => [key, value])
        ),
      })
      console.log("Quiz result:", result)
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
    </div>
  )
}

export default Quiz
