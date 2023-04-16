import React, { useState } from "react"
import FlashCardDeck from "src/components/flash-cards/FlashCardDeck"
import LoggedOutCallToAction from "./LoggedOutCallToAction"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
// import Quiz from "./Quiz"
// import Slideshow from "./Slideshow"
// import ChatAssistant from "./ChatAssistant"

function MainCallToAction() {
  const currentUser = useCurrentUser()
  const [selectedComponent, setSelectedComponent] = useState("flashCards")

  const handleLinkClick = (component) => {
    setSelectedComponent(component)
  }

  return currentUser ? (
    <div>
      <h2>Start studying with Rect!</h2>
      <p>Choose one of the Four Points of Rect to get started!</p>

      <ul>
        <li onClick={() => handleLinkClick("flashCards")}>Flash Cards</li>
        <li onClick={() => handleLinkClick("quiz")}>Quiz</li>
        <li onClick={() => handleLinkClick("slideshow")}>Slideshow</li>
        <li onClick={() => handleLinkClick("chatAssistant")}>Chat Assistant</li>
      </ul>
      <FlashCardDeck />

      {/* {selectedComponent === "quiz" && <Quiz />}
      {selectedComponent === "slideshow" && <Slideshow />}
      {selectedComponent === "chatAssistant" && <ChatAssistant />} */}
    </div>
  ) : (
    <LoggedOutCallToAction />
  )
}

export default MainCallToAction
