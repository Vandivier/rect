export interface IFlashCard {
  backText: string
  frontText: string
}

export interface IFlashCardProps {
  backText: string
  frontText: string
  onClick: () => void
  showFront: boolean
}

export interface IFlashCardDeck {
  cards: IFlashCard[]
}
