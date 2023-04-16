import React, { useState } from "react"
import FlashCardDeck from "src/components/flash-cards/FlashCardDeck"
import Quiz from "src/components/quiz/Quiz"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"

import ChatAssistant from "./ChatAssistant"
import LoggedOutCallToAction from "./LoggedOutCallToAction"
import Slideshow from "./Slideshow"

function MainCallToAction() {
  const currentUser = useCurrentUser()
  const [selectedComponent, setSelectedComponent] = useState("flashCards")

  const handleLinkClick = (component) => {
    setSelectedComponent(component)
  }

  const handleKeyDown = (event, component) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setSelectedComponent(component)
    }
  }

  return currentUser ? (
    <nav role="navigation">
      <ul className="nav-list">
        <li>
          <button
            className={`nav-item ${selectedComponent === "flashCards" ? "active" : ""}`}
            onClick={() => handleLinkClick("flashCards")}
            onKeyDown={(event) => handleKeyDown(event, "flashCards")}
            role="button"
            aria-current={selectedComponent === "flashCards" ? "page" : null}
          >
            Flash Cards
          </button>
        </li>
        <li>
          <button
            className={`nav-item ${selectedComponent === "quiz" ? "active" : ""}`}
            onClick={() => handleLinkClick("quiz")}
            onKeyDown={(event) => handleKeyDown(event, "quiz")}
            role="button"
            aria-current={selectedComponent === "quiz" ? "page" : null}
          >
            Quiz
          </button>
        </li>
        <li>
          <button
            className={`nav-item ${selectedComponent === "slideshow" ? "active" : ""}`}
            onClick={() => handleLinkClick("slideshow")}
            onKeyDown={(event) => handleKeyDown(event, "slideshow")}
            role="button"
            aria-current={selectedComponent === "slideshow" ? "page" : null}
          >
            Slideshow
          </button>
        </li>
        <li>
          <button
            className={`nav-item ${selectedComponent === "chatAssistant" ? "active" : ""}`}
            onClick={() => handleLinkClick("chatAssistant")}
            onKeyDown={(event) => handleKeyDown(event, "chatAssistant")}
            role="button"
            aria-current={selectedComponent === "chatAssistant" ? "page" : null}
          >
            Chat Assistant
          </button>
        </li>
      </ul>

      {selectedComponent === "flashCards" && <FlashCardDeck />}
      {selectedComponent === "quiz" && <Quiz quizName="Coding Projects" />}
      {selectedComponent === "slideshow" && <Slideshow />}
      {selectedComponent === "chatAssistant" && <ChatAssistant />}

      <style jsx>{`
        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
        }
        .nav-item {
          cursor: pointer;
          padding: 8px 16px;
          background-color: #f7f7f7;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-right: 8px;
          font-weight: 600;
          font-size: 16px;
          color: #555;
          transition: all 0.2s ease-in-out;
        }
        .nav-item:hover {
          background-color: #fff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .nav-item.active {
          background-color: #4caf50;
          border-color: #4caf50;
          color: #fff;
        }
        .nav-item.active:hover {
          background-color: #3d8b3d;
          border-color: #3d8b3d;
        }
      `}</style>
    </nav>
  ) : (
    <LoggedOutCallToAction />
  )
}

export default MainCallToAction
