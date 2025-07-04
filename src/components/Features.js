import "./../styles/Features.css"

export default function Features() {
  const list = [
    {
      title: "On-Demand Refuelling",
      desc: "Order fuel anytime, anywhere and we’ll deliver within 30 minutes.",
    },
    {
      title: "Transparent Pricing",
      desc: "Pay pump-price + delivery — no hidden charges, ever.",
    },
    {
      title: "Eco-Smart Routes",
      desc: "Optimised delivery routes cut CO₂ emissions and save you money.",
    },
  ]

  return (
    <section id="features" className="features">
      <h2 className="features__title">Why Fuel Fusion?</h2>
      <div className="features__grid">
        {list.map((f) => (
          <div key={f.title} className="feature">
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
