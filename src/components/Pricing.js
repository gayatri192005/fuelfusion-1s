import "./../styles/Pricing.css"

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: 99,
      perks: ["5 orders / month", "₹ 40 delivery fee", "Standard support"],
    },
    {
      name: "Pro",
      price: 299,
      perks: ["20 orders / month", "₹ 25 delivery fee", "Priority support"],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: 999,
      perks: ["Unlimited orders", "Free delivery", "Dedicated manager"],
    },
  ]

  return (
    <section id="pricing" className="pricing">
      <h2 className="pricing__title">Simple, Transparent Pricing</h2>
      <div className="pricing__grid">
        {plans.map((p) => (
          <div key={p.name} className={`plan${p.highlight ? " plan--highlight" : ""}`}>
            <h3>{p.name}</h3>
            <p className="price">
              ₹ {p.price}
              <span className="period">/ month</span>
            </p>
            <ul>
              {p.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            <button className="plan__btn">Choose Plan</button>
          </div>
        ))}
      </div>
    </section>
  )
}
