import { BlitzPage, Routes } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import getPassedQuizNames from "src/queries/quizResults/getPassedQuizNames"

const PassedQuizList = () => {
  const router = useRouter()
  const [passedQuizzes] = useQuery(getPassedQuizNames, {
    userId: Number(router.query.userId),
  })

  return (
    <>
      <h2>Quizzes this User has Passed:</h2>
      <ul>
        {passedQuizzes.map((quizName, index) => (
          <li key={index}>{quizName}</li>
        ))}
      </ul>
    </>
  )
}

const UserProfile: BlitzPage = () => {
  const router = useRouter()

  return (
    <div style={{ maxWidth: "24rem", margin: "auto" }}>
      <h1>Profile for User ID {router.query.userId}!</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <PassedQuizList />
      </Suspense>
      <Link
        href={Routes.Home()}
        style={{
          background: "rgba(211, 211, 211, 0.3)",
          border: "1px solid grey",
          borderRadius: "4px",
          padding: "0.25rem .5rem",
        }}
      >
        Back to Home
      </Link>
    </div>
  )
}

UserProfile.suppressFirstRenderFlicker = true
UserProfile.getLayout = (page) => <Layout>{page}</Layout>

export default UserProfile
