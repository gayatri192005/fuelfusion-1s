"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
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
  { id: 2, title: "Driver Assigned", note: "Driver is on the way", done: false },
  { id: 3, title: "En Route", note: "Heading to your location", done: false },
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
    <main className="tracking-page">
      <header className="tracking-header">
        <Link to="/dashboard" className="back">
          ← Dashboard
        </Link>
        <h1 className="title">Tracking – Order #{orderId}</h1>
        <span className={`status ${eta === 0 ? "delivered" : ""}`}>{eta === 0 ? "Delivered" : `≈ ${eta} min`}</span>
      </header>

      {/* Placeholder map */}
      <section className="map-box">
        <div className="pulse-marker" />
        <p className="map-text">
          Live GPS Tracker
          <br />
          Driver&nbsp;{eta === 0 ? "arrived" : `≈ ${eta} min`}
        </p>
      </section>

      {/* Progress list */}
      <section className="progress">
        {steps.map((s) => (
          <div key={s.id} className={`step ${s.done ? "done" : ""}`}>
            <div className="bullet">{s.done ? "✔︎" : s.id}</div>
            <div className="details">
              <h3>{s.title}</h3>
              <p>{s.note}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
