import React, { useState } from "react"

import FlashCard from "./FlashCard/FlashCard"
import { IFlashCardDeck } from "./interfaces"

const sampleDeck: IFlashCardDeck = {
  cards: [
    {
      frontText: "What is the capital of France?",
      backText: "Paris",
    },
    {
      frontText: "What is the square root of 81?",
      backText: "9",
    },
    {
      frontText: "What is the tallest mountain in the world?",
      backText: "Mount Everest",
    },
    {
      frontText: "How many continents are there?",
      backText: "7",
    },
  ],
}

const FlashCardDeck: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0)
  const [showFront, setShowFront] = useState(true)

  const handleClickCard = () => {
    setShowFront(!showFront)
  }

  const handleNext = () => {
    setCurrentCard((prevState) => (prevState + 1) % sampleDeck.cards.length)
    setShowFront(true)
  }

  const handleLast = () => {
    setCurrentCard((prevState) => (prevState === 0 ? sampleDeck.cards.length - 1 : prevState - 1))
    setShowFront(true)
  }

  const currCard = sampleDeck.cards[currentCard]

  return currCard ? (
    <div>
      <h2>Study Up with Flash Cards!</h2>
      <FlashCard
        backText={currCard.backText}
        frontText={currCard.frontText}
        onClick={handleClickCard}
        showFront={showFront}
      />
      <button onClick={handleLast}>Last</button>
      <button onClick={handleNext}>Next</button>
    </div>
  ) : (
    <p>No cards</p>
  )
}

export default FlashCardDeck
