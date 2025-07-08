"use client"

import { useState } from "react"
import "../styles/OrderPage.css"

export default function OrderPage() {
  const [litres, setLitres] = useState(20)
  const [step, setStep] = useState(1)
  const pricePerLitre = 105 // ₹

  const total = litres * pricePerLitre

  return (
    <section className="order-page">
      <h1>Place Order</h1>

      {step === 1 && (
        <>
          <label>
            Litres&nbsp;
            <input type="number" value={litres} onChange={(e) => setLitres(+e.target.value)} min={5} max={200} />
          </label>
          <button onClick={() => setStep(2)}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <p>
            Total payable: <strong>₹{total.toLocaleString("en-IN")}</strong>
          </p>
          <button onClick={() => setStep(3)}>Pay &amp; Place Order</button>
        </>
      )}

      {step === 3 && <p className="success">Order placed! Track delivery in real time.</p>}
    </section>
  )
}
