import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const UserProfile: React.FC = () => {
  const router = useRouter()
  const { userId } = router.query

  return (
    <div style={{ maxWidth: "24rem", margin: "auto" }}>
      <h1>Hello, Profile!</h1>
      {userId && <p>User ID: {userId}</p>}
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

export default UserProfile
