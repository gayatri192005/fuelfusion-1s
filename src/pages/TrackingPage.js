"use client"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../styles/TrackingPage.css"

/**
 * Fuel Fusion – TrackingPage
 * --------------------------------------------------
 * Shows a lightweight “live” status timeline for an order.
 * In real life you’d replace the interval simulation with
 * WebSocket or SSE updates from your backend.
 */

const EMPTY_STEPS = [
  { id: 1, title: "Order Confirmed", note: "We received your order", done: true },
  { id: 2, title: "Driver Assigned", note: "Driver is on the way", done: true },
  { id: 3, title: "En Route", note: "Heading to your location", done: true },
  { id: 4, title: "Arrived", note: "Truck has arrived", done: false },
  { id: 5, title: "Fuel Delivered", note: "Enjoy your drive!", done: false },
]

export default function TrackingPage() {
  const { orderId = "—" } = useParams()
  const [steps, setSteps] = useState(EMPTY_STEPS)
  const [eta, setEta] = useState(20) // minutes left (fake)

  /* --------------------------------------------------
   * Demo-only progress: mark next step as done
   * every 45 seconds and decrease ETA.
   * -------------------------------------------------- */
  useEffect(() => {
    const id = setInterval(() => {
      setSteps((prev) => {
        const next = [...prev]
        const idx = next.findIndex((s) => !s.done)
        if (idx !== -1) next[idx].done = true
        return next
      })
      setEta((m) => Math.max(0, m - 3))
    }, 45_000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="tracking-page">
      <h1>Order Tracking</h1>
      <div className="map-placeholder">
        <p>Map will appear here.</p>
      </div>
      <ul className="status">
        {steps.map((s) => (
          <li key={s.id} className={s.done ? "done" : s.id === 4 ? "current" : ""}>
            {s.title}
          </li>
        ))}
      </ul>
    </section>
  )
}
