import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { Suspense } from "react"
import logout from "src/auth/mutations/logout"
import FlashCardDeck from "src/components/flash-cards/FlashCardDeck"
import Tooltip from "src/core/components/tooltip/Tooltip"
import Layout from "src/core/layouts/Layout"
import styles from "src/styles/Home.module.css"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"

const ProfileLink = () => {
  const currentUser = useCurrentUser()

  return currentUser ? (
    <Tooltip title="View my Rect profile">
      <Link
        href={`/profile/${currentUser.id}`}
        target="_self"
        rel="noopener noreferrer"
        className={styles.card}
      >
        View My Public Profile
        <span className={styles.arrowIcon} />
      </Link>
    </Tooltip>
  ) : (
    <Tooltip isEmphasized={true} title="Click to sign up and access your unique Rect profile!">
      <Link
        href={Routes.SignupPage()}
        target="_self"
        rel="noopener noreferrer"
        className={styles.card}
      >
        View My Public Profile
        <span className={styles.arrowIcon} />
      </Link>
    </Tooltip>
  )
}

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className={styles.button}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()} className={styles.button}>
          <strong>Sign Up</strong>
        </Link>
        <Link href={Routes.LoginPage()} className={styles.loginButton}>
          <strong>Login</strong>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className={styles.globe} />

      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <h1>Welcome to Rect! 🎉🎉</h1>

              <p>TODO: links for flash cards, quizzes, slides, and chat assistant</p>

              <div>
                <h2 style={{ margin: "auto" }}>Flash Card Deck</h2>
                <FlashCardDeck />
              </div>

              <h2>Sign up to get started!</h2>
              <div style={{ margin: "auto", maxWidth: "600px" }}>
                <p>
                  Rect helps you #LearnToCode with flash cards and a chat assistant. Then, share
                  your achievements 🏆🏆 with a public profile! 🙌
                </p>
                <p>
                  Educational content is based on the{" "}
                  <a
                    href="https://github.com/Vandivier/ladderly-slides"
                    style={{ textDecoration: "underline" }}
                    target="_blank"
                  >
                    open source Ladderly curriculum
                  </a>
                  .
                </p>
              </div>

              <div className={styles.buttonContainer}>
                <Suspense fallback="Loading...">
                  <UserInfo />
                </Suspense>
              </div>
            </div>

            <div className={styles.body}>
              <div className={styles.instructions}>
                <p>
                  <strong>How to use Rect in four simple steps:</strong>
                </p>

                <div>
                  <div className={styles.code}>
                    <span>1</span>
                    <pre>
                      <code>Sign up and login!</code>
                    </pre>
                  </div>

                  <div className={styles.code}>
                    <span>2</span>
                    <pre>
                      <code>Start studying with a flash ⚡🔥 card deck</code>
                    </pre>
                  </div>

                  <div className={styles.code}>
                    <span>3</span>
                    <pre>
                      <code>Pass an 🎓 exam</code>
                    </pre>
                  </div>

                  <div className={styles.code}>
                    <span>4</span>
                    <pre>
                      <code>Share your achievements with a public profile! 🙌</code>
                    </pre>
                  </div>
                </div>
              </div>
              <div className={styles.linkGrid}>
                <a
                  href="https://ladderly.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                >
                  Ladderly.io
                  <span className={styles.arrowIcon} />
                </a>
                <a
                  href="https://github.com/Vandivier/rect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                >
                  Rect on GitHub
                  <span className={styles.arrowIcon} />
                </a>
                <a
                  href="https://github.com/Vandivier/ladderly-slides"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                >
                  Ladderly Open Curriculum on GitHub
                  <span className={styles.arrowIcon} />
                </a>
                <Suspense fallback="Loading...">
                  <ProfileLink />
                </Suspense>
              </div>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <span>Powered by</span>
          <a
            href="https://ladderly.io/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.textLink}
          >
            ladderly.io
          </a>
        </footer>
      </div>
    </Layout>
  )
}

export default Home
