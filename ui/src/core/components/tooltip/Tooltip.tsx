import React, { useState } from "react"
import styles from "./Tooltip.module.css"

interface TooltipProps {
  children: React.ReactNode
  isEmphasized?: boolean
  title: string
}

const Tooltip: React.FC<TooltipProps> = ({ children, isEmphasized = false, title }) => {
  const [show, setShow] = useState(false)
  const currStyle = isEmphasized ? styles.tooltip + " " + styles.emphasized : styles.tooltip

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && <div className={currStyle}>{title}</div>}
      {children}
    </div>
  )
}

export default Tooltip
