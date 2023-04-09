import React from "react"

import { IFlashCardProps } from "../interfaces"
import styles from "./FlashCard.module.css"

const FlashCard: React.FC<IFlashCardProps> = ({ backText, frontText, onClick, showFront }) => (
  <div className={styles["flash-card"]} onClick={onClick}>
    <p>{showFront ? frontText : backText}</p>
  </div>
)

export default FlashCard
