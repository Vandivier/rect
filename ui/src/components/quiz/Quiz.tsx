import React, { useEffect, useState } from "react"

import { Form, Field } from "react-final-form"
import getQuizByName from "src/queries/quizzes/getQuizByName"
import { PossibleAnswer } from "@prisma/client"
import { useQuery } from "@blitzjs/rpc"

type QuizFormValues = {
  selectedAnswerId: string
}

type QuizProps = {
  quizName: string
  onSubmit: (values: QuizFormValues) => void
}

const Quiz: React.FC<QuizProps> = ({ quizName }) => {
  const [quiz] = useQuery(getQuizByName, { name: quizName })

  const onSubmit = (values: QuizFormValues) => {
    console.log(values)
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
                      name="selectedAnswerId"
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
