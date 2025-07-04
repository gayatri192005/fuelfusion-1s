"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/OrderPage.css"

/**
 * Fuel Fusion – OrderPage
 * Simple three-step wizard:
 * 1) Select fuel & quantity 2) Enter delivery address 3) Review & pay
 * All prices are shown in Indian Rupees (₹).
 */
const FUEL_TYPES = [
  { id: "petrol", name: "Petrol (91-Octane)", price: 105.9 },
  { id: "diesel", name: "Diesel", price: 94.3 },
  { id: "premium", name: "Premium Petrol (95-Octane)", price: 113.4 },
]

export default function OrderPage() {
  /* form state ----------------------------------------------------------- */
  const [step, setStep] = useState(1)
  const [fuelId, setFuelId] = useState(null)
  const [litres, setLitres] = useState(10)
  const [address, setAddress] = useState("")
  const navigate = useNavigate()

  /* derived -------------------------------------------------------------- */
  const selectedFuel = FUEL_TYPES.find((f) => f.id === fuelId)
  const fuelCost = selectedFuel ? selectedFuel.price * litres : 0
  const deliveryFee = 150 // flat fee (₹)
  const total = fuelCost + deliveryFee

  /* helpers -------------------------------------------------------------- */
  const goNext = () => setStep((s) => Math.min(3, s + 1))
  const goBack = () => setStep((s) => Math.max(1, s - 1))
  const placeOrder = () => {
    // TODO: replace with real API call
    const orderId = `FF${Date.now()}`
    navigate(`/tracking/${orderId}`)
  }

  /* --------------------------------------------------------------------- */
  return (
    <main className="order-page">
      <h1 className="order-title">Place Fuel Order</h1>

      {/* progress bar */}
      <ol className="order-steps">
        {["Fuel", "Location", "Payment"].map((label, i) => {
          const n = i + 1
          const cls = step === n ? "active" : step > n ? "done" : ""
          return (
            <li key={label} className={cls}>
              {label}
            </li>
          )
        })}
      </ol>

      {/* STEP 1 ----------------------------------------------------------- */}
      {step === 1 && (
        <section>
          <h2>Select fuel type & quantity</h2>

          {/* fuel cards */}
          <div className="fuel-grid">
            {FUEL_TYPES.map((f) => (
              <button
                key={f.id}
                className={`fuel-card ${fuelId === f.id ? "selected" : ""}`}
                onClick={() => setFuelId(f.id)}
              >
                <strong>{f.name}</strong>
                <span className="price">₹{f.price.toFixed(1)} / L</span>
              </button>
            ))}
          </div>

          {/* quantity */}
          <label className="qty-label">
            Litres:
            <input
              type="number"
              min={1}
              max={200}
              value={litres}
              onChange={(e) => setLitres(Math.max(1, Math.min(200, Number(e.target.value))))}
            />
          </label>

          {/* nav */}
          <div className="nav">
            <button className="btn primary" disabled={!fuelId} onClick={goNext}>
              Continue
            </button>
          </div>
        </section>
      )}

      {/* STEP 2 ----------------------------------------------------------- */}
      {step === 2 && (
        <section>
          <h2>Delivery location</h2>

          <textarea
            className="address-box"
            rows={3}
            placeholder="Full address with landmark"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="nav">
            <button className="btn" onClick={goBack}>
              Back
            </button>
            <button className="btn primary" disabled={!address.trim()} onClick={goNext}>
              Continue
            </button>
          </div>
        </section>
      )}

      {/* STEP 3 ----------------------------------------------------------- */}
      {step === 3 && (
        <section>
          <h2>Review & pay</h2>

          <ul className="summary">
            <li>
              {litres} L of {selectedFuel?.name}
              <span>₹{fuelCost.toFixed(0)}</span>
            </li>
            <li>
              Delivery Fee <span>₹{deliveryFee}</span>
            </li>
            <li className="total">
              Total <span>₹{total.toFixed(0)}</span>
            </li>
          </ul>

          <button className="btn primary big" disabled={!selectedFuel || !address.trim()} onClick={placeOrder}>
            Pay & Place Order
          </button>

          <div className="nav">
            <button className="btn" onClick={goBack}>
              Back
            </button>
          </div>
        </section>
      )}
    </main>
  )
}
