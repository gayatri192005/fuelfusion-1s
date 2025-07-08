"use client"
import "../styles/Notification.css"
import { useState, useEffect } from "react"

export default function Notification({ message = "", type = "info", duration = 3000 }) {
  const [visible, setVisible] = useState(Boolean(message))

  useEffect(() => {
    if (!message) return
    setVisible(true)
    const id = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(id)
  }, [message, duration])

  if (!visible) return null

  return <div className={`alert ${type}`}>{message}</div>
}
