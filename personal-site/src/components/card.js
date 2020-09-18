import React from "react"
import cardStyles from "./card.module.css"

export default function Card({ children }) {
  return (
    <div className={cardStyles.card}>
      <div className={cardStyles.content}>{children}</div>
    </div>
  )
}
