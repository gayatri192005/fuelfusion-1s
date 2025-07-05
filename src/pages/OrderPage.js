"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/OrderPage.css"

/**
 * Fuel Fusion – OrderPage
 * A simple 3-step wizard:
 *   1. Choose fuel type
 *   2. Enter quantity & address
 *   3. Review + Pay  (fake submit)
 *
 * All prices are shown in Indian Rupees (₹).
 */
export default function OrderPage() {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [fuelType, setFuelType] = useState("Petrol")
  const [qty, setQty] = useState(10)
  const [address, setAddress] = useState("")
  const pricePerLitre = fuelType === "Diesel" ? 88 : 96 // rough INR rates
  const total = qty * pricePerLitre

  function next() {
    if (step < 3) setStep(step + 1)
  }
  function prev() {
    if (step > 1) setStep(step - 1)
  }
  function placeOrder() {
    // in real life, call API → create order → get ID
    const fakeOrderId = Math.floor(Math.random() * 10_000)
      .toString()
      .padStart(4, "0")
    navigate(`/tracking/${fakeOrderId}`)
  }

  return (
    <div className="order-page">
      <h1>Place a Fuel Order</h1>

      {/* Step indicators */}
      <div className="steps">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`step ${step === s ? "active" : step > s ? "done" : ""}`}>
            {s}
          </div>
        ))}
      </div>

      {/* Step content */}
      {step === 1 && (
        <section className="card">
          <h2>Select Fuel Type</h2>
          <label>
            <input
              type="radio"
              name="fuel"
              value="Petrol"
              checked={fuelType === "Petrol"}
              onChange={() => setFuelType("Petrol")}
            />
            Petrol (₹96 / L)
          </label>
          <label>
            <input
              type="radio"
              name="fuel"
              value="Diesel"
              checked={fuelType === "Diesel"}
              onChange={() => setFuelType("Diesel")}
            />
            Diesel (₹88 / L)
          </label>
          <div className="actions">
            <button onClick={next}>Next</button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="card">
          <h2>Quantity &amp; Delivery Address</h2>
          <label>
            Quantity (litres)
            <input type="number" min="1" step="1" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
          </label>
          <label>
            Address
            <textarea
              rows="3"
              placeholder="Street, City, Pincode"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <div className="actions">
            <button onClick={prev}>Back</button>
            <button onClick={next} disabled={!address}>
              Next
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="card">
          <h2>Review &amp; Pay</h2>
          <ul className="review">
            <li>
              <strong>Fuel:</strong> {fuelType}
            </li>
            <li>
              <strong>Quantity:</strong> {qty} L
            </li>
            <li>
              <strong>Address:</strong> {address}
            </li>
            <li>
              <strong>Total:</strong> ₹{total.toLocaleString()}
            </li>
          </ul>
          <div className="actions">
            <button onClick={prev}>Back</button>
            <button className="primary" onClick={placeOrder}>
              Pay &amp; Place Order
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
