"use client"

/**
 * Very small notification/toast component.
 * For now it simply renders children in a fixed bottom-center position.
 * Expand later with queueing or animations as 필요.
 */
import "../styles/Notification.css"
import { useState, useEffect } from "react"

export default function Notification({ message = "", duration = 3000 }) {
  const [visible, setVisible] = useState(Boolean(message))

  useEffect(() => {
    if (!message) return
    setVisible(true)
    const id = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(id)
  }, [message, duration])

  if (!visible) return null

  return <div className="toast">{message}</div>
}
