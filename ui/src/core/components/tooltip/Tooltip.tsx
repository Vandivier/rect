import React, { useState } from "react"
import styles from "./Tooltip.module.css"

interface TooltipProps {
  children: React.ReactNode
  title: string
}

const Tooltip: React.FC<TooltipProps> = ({ children, title }) => {
  const [show, setShow] = useState(false)

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && <div className={styles.tooltip}>{title}</div>}
      {children}
    </div>
  )
}

export default Tooltip
