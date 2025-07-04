import "../styles/Pricing.css"

const PLANS = [
  {
    name: "Starter",
    price: 199,
    features: ["Up to 500 L / month", "Live tracking", "Standard support"],
  },
  {
    name: "Business",
    price: 499,
    highlighted: true,
    features: ["Up to 2 000 L / month", "Priority delivery", "Dedicated manager"],
  },
  {
    name: "Enterprise",
    price: 999,
    features: ["Unlimited volume", "24×7 support", "Custom SLA & analytics"],
  },
]

export default function Pricing() {
  return (
    <section className="pricing">
      <h2 className="section-title">Pricing (₹/month)</h2>
      <div className="plans">
        {PLANS.map((plan) => (
          <div key={plan.name} className={`plan ${plan.highlighted ? "active" : ""}`}>
            <h3>{plan.name}</h3>
            <p className="price">
              ₹{plan.price}
              <span className="unit">/mo</span>
            </p>
            <ul>
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <button className="btn-select">Select Plan</button>
          </div>
        ))}
      </div>
    </section>
  )
}
