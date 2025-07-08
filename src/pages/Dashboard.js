"use client"

import React from "react"
import { Link } from "react-router-dom"
import "../styles/Dashboard.css"

export default function Dashboard() {
  const [name] = React.useState("John")

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <h1>Welcome back, {name}!</h1>
        <Link to="/order" className="dashboard__order-btn">
          Order Fuel
        </Link>
      </header>

      <section className="dashboard__stats">
        <div className="stat">
          <h2>₹ 1,23,450</h2>
          <p>Total Spend</p>
        </div>
        <div className="stat">
          <h2>412 L</h2>
          <p>Fuel Delivered</p>
        </div>
        <div className="stat">
          <h2>23.8 kg</h2>
          <p>CO₂ Saved</p>
        </div>
      </section>

      <section className="dashboard__orders">
        <h3>Recent Orders</h3>
        <ul>
          <li>
            <span>ORD-10023</span>
            <span>₹ 2,199</span>
            <span className="delivered">Delivered</span>
          </li>
          <li>
            <span>ORD-10022</span>
            <span>₹ 1,749</span>
            <span className="delivered">Delivered</span>
          </li>
          <li>
            <span>ORD-10021</span>
            <span>₹ 899</span>
            <span className="pending">En Route</span>
          </li>
        </ul>
      </section>

      <section className="dashboard__placeholder">
        <h1>Dashboard</h1>
        <p>This is a simple placeholder. Connect your real analytics later.</p>
      </section>
    </main>
  )
}
